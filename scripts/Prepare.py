

def getAllLines(fileName):
	content = []
	with open(fileName) as f:
		content = f.readlines()
	return content

def getNewLines(lines):
	newArr = []
	cpt = 0
	for line in lines:
		l = line
		if cpt == 1:
			newArr.append("if(window.exports === undefined) // hacked a bit\n")
			newArr.append("\twindow.exports = {};\n")

		if 'require' in line:
			l = "//" + line
		elif 'githubCommitFilter_1.' in line:
			l = line.replace('githubCommitFilter_1.', '')

		newArr.append(l)
		cpt += 1
	return newArr

def wwriteLines(fileTarget, lines):
	with open(fileTarget, 'w') as f:
		f.writelines(lines)

baseDir = "D:\\Prog\\Github\\GithubCommitFilter\\dist"
files = ["\\githubCommitFilter.js", "\\main.js"]

for file in files:
	lines = getAllLines(baseDir + file)
	newLines = getNewLines(lines)
	wwriteLines(baseDir + "\\test1" + file, newLines)

