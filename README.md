# Code Generator for Dynamsoft Barcode SDK 

The Code Generator helps developers to quickly get started with [Dynamsoft Barcode Reader SDK](https://www.dynamsoft.com/barcode-reader/overview/) using JavaScript, Python, C/C++, .NET, Android, and iOS in Visual Studio Code.

## Dev Requirements for Windows, Linux and macOS
- [Visual Studio](https://visualstudio.microsoft.com/downloads/)
- [CMake](https://cmake.org/download/)
- [.NET SDK](https://dotnet.microsoft.com/en-us/download/visual-studio-sdks)
- [Python](https://www.python.org/downloads/)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/)

## Usage
1. Press `F1` to show command palette and run **DBR** to list all supported projects.
    
    ![vscode-dbr-extension](https://www.dynamsoft.com/codepool/img/2022/05/vscode-dbr-extension.png)

2. Select the project you want to generate code for.
3. Build and run the project:
    - **Web**
        ```bash
        python -m http.server
        ```
    - **Python** (**Windows**, **Linux**, and **macOS**)
        ```bash
        pip install dbr
        python app.py
        ```
    - **.NET** (**Windows**, **Linux**, and **macOS**)
        ```bash
        dotnet restore
        dotnet run
        ```
    - **C/C++** (**Windows**, **Linux**, and **macOS**)
        ```bash
        mkdir build
        cd build

        # if Windows
        cmake -DCMAKE_GENERATOR_PLATFORM=x64 ..
        # else
        cmake ..

        cmake --build .
        ```
    - **Android**
        
        Import the project to Android Studio.

    - **iOS**
        
        Run `pod install` and import the project to Xcode.


