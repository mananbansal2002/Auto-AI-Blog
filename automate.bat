@echo off

:: Navigate to the folder where your project is located
cd /d C:\Users\pbans\Downloads\dark-ai-blog\dark-ai-blog

:: Run the Node.js script
echo Running generate-story.js...
node generate/generate-story.js

:: Git commands to add, commit, and push changes
echo Staging changes...
git add .

echo Committing changes...
git commit -m "Automated commit of new story"

echo Pushing changes to GitHub...
git push

echo All done!
pause
