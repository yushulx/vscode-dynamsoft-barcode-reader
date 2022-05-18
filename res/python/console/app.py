#!/usr/bin/env python3
import sys
import os
import cv2
from dbr import EnumBarcodeFormat, EnumBarcodeFormat_2
from dbr import *

def main():
    BarcodeReader.init_license("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==")
    reader = BarcodeReader()
    while True:
        filename = input("Enter the image file name: ")
        if filename == "":
            break

        if not os.path.exists(filename):
            continue

        try:
            results = reader.decode_file(filename)
            index = 0
            for result in results:
                points = result.localization_result.localization_points
                print("Index: " + str(index) + "\n")
                print("Barcode format: " + result.barcode_format_string + '\n')
                print("Barcode value: " + result.barcode_text + '\n')
                print("Bounding box: " + str(points[0]) + ' ' + str(points[1]) + ' ' + str(points[2]) + ' ' + str(points[3]) + '\n')
                print('-----------------------------------\n')
                index += 1
        except BarcodeReaderError as error:
            print(error)

if __name__ == '__main__':
    main()