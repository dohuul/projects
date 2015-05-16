var myClass = function(par1, par2){
	
 this.par1Val = par1;
 this.par2Val = par2;

	
}


myClass.factory_ = function(par){
	return function(value){

		return new myClass(par, value);
	}

}



var b = myClass.factory_(3);

var c = b(4);

console.log(c.par1Val  + "  " + c.par2Val )