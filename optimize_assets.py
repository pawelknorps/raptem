import os
import subprocess

assets_dir = 'public/assets'
images = [f for f in os.listdir(assets_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]

for img in images:
    input_path = os.path.join(assets_dir, img)
    output_path = os.path.join(assets_dir, os.path.splitext(img)[0] + '.webp')
    print(f"Converting {input_path} to {output_path}...")
    subprocess.run(['cwebp', '-q', '80', input_path, '-o', output_path])

# Videos
videos = [f for f in os.listdir(assets_dir) if f.lower().endswith('.mp4')]
for vid in videos:
    input_path = os.path.join(assets_dir, vid)
    output_path = os.path.join(assets_dir, os.path.splitext(vid)[0] + '_opt.mp4')
    print(f"Optimizing video {input_path}...")
    # Using ffmpeg to optimize: libx264, crf 28 (good balance), preset medium
    subprocess.run(['ffmpeg', '-i', input_path, '-vcodec', 'libx264', '-crf', '28', '-preset', 'medium', '-acodec', 'aac', '-b:a', '128k', output_path])
    # Replace original with optimized
    # os.rename(output_path, input_path)
