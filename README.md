# SnowAnimation
p5 javascript coded snow with one of my watercolors in background
ability to capture snippets of the video

change it to use webm like the others convert with the below command

ffmpeg -r 10 -i snow_webm.webm -c:a copy -c:v libx264 -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" -b:v 5M -maxrate 5M snow.mp4
