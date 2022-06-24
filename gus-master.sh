git checkout master
git pull origin master
git merge master staging
git add .  
git commit -m "Release"
git push origin master
git checkout staging


