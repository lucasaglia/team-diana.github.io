# Catkin Package Layout

for a generic package called **package_name**, the layout of the directories should be:

```bash
package_name/
	include/
		package_name/ # replace with actual package name
			header1.h
			header2.h
			header_dir1/ 
				a1.h
				a2.h
			header_dir2/
				b1.h

	src/
		main.cpp
		src1.cpp
		src2.cpp
		package_name/ # only for python scripts 
			src1.py
			src2.py
			src3.py
			python_executable1
			python_executable2

	srv/
		Serv1.srv
		Serv2.srv

	thirdparty/ # only if there are third party libraries
		ThirdpartyLib1/
			CMakeLists.txt
		ThirdpartyLib2/
			Makefile

	setup.py
	CMakeLists.txt
	package.xml
	Readme.md
```
    
            
