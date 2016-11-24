## OpenCV 2 vs 3

### Python enums:
Python enums in 2.4 version had the same name of their C API equivalent, now their name is changed, for instance cv2.CV_LOAD_IMAGE_COLOR became cv2.IMREAD_COLOR 


See http://stackoverflow.com/questions/23339315/read-image-grayscale-opencv-3-0-0-dev

> Generally speaking, flags now have names prefixed in a manner that relates to the function to which they refer. (e.g. imread flags start with IMREAD_, cvtColor flags start with COLOR_, etc.)


[OpenCV 2.4 - C API Img Codecs](http://docs.opencv.org/3.1.0/da/d0a/group__imgcodecs__c.html)
[OpenCV 3.1 - Python API Img Codecs](http://docs.opencv.org/3.1.0/d4/da8/group__imgcodecs.html)
[OpenCV 3.1 - Python API Img Colors](http://docs.opencv.org/3.1.0/d7/d1b/group__imgproc__misc.html)

