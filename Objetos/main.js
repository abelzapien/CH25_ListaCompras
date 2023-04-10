
class Person {
    name="";
    email="";
    age=0;
    resume="";

    printInfo(){
        console.log(this.name, this.email, this.age, this.resume);
    }//printInfo
}//class Person

let john = new Person();
john.name="John Wick"
john.age=40;
john.email="jwick@gmail.com"

john.printInfo();