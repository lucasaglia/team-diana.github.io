# Unit Testing with C++ and Catkin

## Google Test

See also:
 - [Google Test Primer](https://github.com/google/googletest/blob/master/googletest/docs/Primer.md)
 
 	It lists the macro that you can use for comparision

### Directory structure:

```bash
package_name/
	src/
    include
    	package_name
    test/
    	test1.cpp
```

### Test Source

*test1.cpp*

```c++
#include <gtest/gtest.h>

// Note: TestSuites are PascalCased, testCases are camelCased
TEST(TestSuite, testCase1) {
	ASSERT_EQ(1+1, 2);
}


TEST(TestSuite, testCase2) {
	ASSERT_NE(2+2, 5);
}

int main(int argc, char **argv) {
  testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}
```

### CMakeLists.txt

```
// ...

catkin_add_gtest(test1 test/test1.cpp)
//catkin_add_gtest(test2 test/test2.cpp)



// ...
```

### Troubleshooting

#### PThread
In case you notice problems related to pthread, maybe you need to link against it:

```
target_link_libraries(${PROJECT_NAME}  ... pthread ... ) 
```

#### Manual execution

Tests are not compiled by default, it is necessary to run
`catkin_make tests` in the workspace directory, or `make tests` in the build directory.

If you are using KDevelop, you may prefer to change the default build target from **all** to **run_tests** 

