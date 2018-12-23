@echo OFF
SET CurrentDir=%~dp0
SET Sep="\\.."
SET ScriptDir=%CurrentDir%..\dist\test1

ECHO The current file path this bat file is executing in is the following:

REM ECHO '%ScriptDir%'

REM echo %cd%
cd %ScriptDir%
REM echo %cd%

web-ext run --start-url https://github.com/lezhumain/GithubCommitFilter/commits/master