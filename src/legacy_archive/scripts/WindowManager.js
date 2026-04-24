class WindowManager {
  constructor() {
    this.windows = document.querySelectorAll('.draggable-window');
    this.zIndex = 1000;
    this.snapThreshold = 20;
    this.init();
    this.loadPositions();
  }

  init() {
    this.windows.forEach(win => {
      const header = win.querySelector('.window-title') || win;
      header.style.cursor = 'move';
      header.addEventListener('mousedown', (e) => this.onMouseDown(e, win));
    });

    // Listen for new windows being added (e.g., from React)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.classList.contains('draggable-window')) {
            this.attachWindow(node);
          } else if (node.nodeType === 1) {
            node.querySelectorAll('.draggable-window').forEach(w => this.attachWindow(w));
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  attachWindow(win) {
    const header = win.querySelector('.window-title') || win;
    header.style.cursor = 'move';
    header.addEventListener('mousedown', (e) => this.onMouseDown(e, win));
    this.loadWindowPosition(win);
  }

  onMouseDown(e, win) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
    
    this.zIndex++;
    win.style.zIndex = this.zIndex;
    
    if (!e.target.classList.contains('window-title') && e.target !== win) {
      // Allow dragging by clicking anywhere on the frame IF it's not a button/input
      // But we prefer the title
    }

    const startX = e.clientX - win.offsetLeft;
    const startY = e.clientY - win.offsetTop;

    const onMouseMove = (moveEvent) => {
      win.style.position = 'absolute';
      win.style.margin = '0';
      
      let left = moveEvent.clientX - startX;
      let top = moveEvent.clientY - startY;

      // Snapping
      if (Math.abs(left) < this.snapThreshold) left = 0;
      if (Math.abs(top) < this.snapThreshold) top = 0;
      if (Math.abs(window.innerWidth - (left + win.offsetWidth)) < this.snapThreshold) {
        left = window.innerWidth - win.offsetWidth;
      }
      if (Math.abs(window.innerHeight - (top + win.offsetHeight + 32)) < this.snapThreshold) {
        top = window.innerHeight - win.offsetHeight - 32; // 32 is taskbar approx
      }

      win.style.left = `${left}px`;
      win.style.top = `${top}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      this.savePosition(win);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  savePosition(win) {
    const id = win.id || win.getAttribute('data-window-id');
    if (!id) return;
    const pos = {
      left: win.style.left,
      top: win.style.top,
      zIndex: win.style.zIndex
    };
    localStorage.setItem(`win_pos_${id}`, JSON.stringify(pos));
  }

  loadPositions() {
    this.windows.forEach(win => this.loadWindowPosition(win));
  }

  loadWindowPosition(win) {
    const id = win.id || win.getAttribute('data-window-id');
    if (!id) return;
    const saved = localStorage.getItem(`win_pos_${id}`);
    if (saved) {
      const pos = JSON.parse(saved);
      win.style.position = 'absolute';
      win.style.margin = '0';
      win.style.left = pos.left;
      win.style.top = pos.top;
      win.style.zIndex = pos.zIndex;
      if (parseInt(pos.zIndex) > this.zIndex) {
        this.zIndex = parseInt(pos.zIndex);
      }
    }
  }
}

if (typeof document !== 'undefined') {
  const wm = new WindowManager();
}

export default WindowManager;
