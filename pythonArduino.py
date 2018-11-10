import serial #Import Serial Library
arduinoSerialData=serial.Serial('COM6',9600)#specify COM port and baud rate 
#object tied to the serial port, any other name will also do
#continuously reading from the serial port therefore a loop
while(1): #will loop forever because we're continuously reading
    if(arduinoSerialData.inWaiting()>0):#we want to do commands only if there is data waiting on the serial port...i.e check if data is there at the serial port
        myData=arduinoSerialData.readline()#readline reads the data in string even if it is a number so myData will be a string
        print myData
        #the loop will go 1000s of times till it gets the data,very fast
