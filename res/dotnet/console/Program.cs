using System;
using System.Runtime.InteropServices;
using Dynamsoft;
using Result = Dynamsoft.BarcodeQRCodeReader.Result;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {            
            BarcodeQRCodeReader.InitLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="); // Get a license key from https://www.dynamsoft.com/customer/license/trialLicense?product=dbr
            BarcodeQRCodeReader? reader = null;
            try {
                reader = BarcodeQRCodeReader.Create();
                Console.WriteLine("GetVersionInfo(): " + BarcodeQRCodeReader.GetVersionInfo());

                // Refer to https://www.dynamsoft.com/barcode-reader/parameters/structure-and-interfaces-of-parameters.html?ver=latest
                reader.SetParameters("{\"Version\":\"3.0\", \"ImageParameter\":{\"Name\":\"IP1\", \"BarcodeFormatIds\":[\"BF_QR_CODE\", \"BF_ONED\"], \"ExpectedBarcodesCount\":20}}");

                Console.WriteLine("Please enter an image file: ");
                string? filename = Console.ReadLine();
                if (filename != null) {
                    Result[]? results = reader.DecodeFile(filename);
                    if (results != null) {
                        foreach (Result result in results) {
                            Console.WriteLine(result.Text);
                        }
                    }
                    else {
                        Console.WriteLine("No barcode found.");
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                if (reader != null)
                {
                    reader.Destroy();
                }
            }
        }
    }
}
