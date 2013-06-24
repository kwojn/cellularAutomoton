
(function(global){
	
	global.virusHandler = {
		
		config:{
			x:400,
			y:400,
			immunity:0.0,
		},
		
		initCanvas:function(containingId){
			if (typeof this.canvas=='undefined'){
				this.canvas = document.createElement('canvas');
				this.context = this.canvas.getContext("2d");
				this.canvas.width=this.config.x;
				this.canvas.height=this.config.y;
				document.getElementById(containingId).appendChild(this.canvas);
			}
			
			
			
		},
	
		initPopulation:function(){
			var imageData = this.context.createImageData(this.config.x,this.config.y);
			
			var i=0;
			for (var y=0;y<this.config.y;y++){
				for(var x=0;x<this.config.x;x++){
					 
					imageData.data[i]=this.config.immunity<Math.random()?(1+Math.round(2*Math.random())):0;
					imageData.data[i+1]=Math.round(255*Math.random());
					imageData.data[i+2]=imageData.data[i]==0?255:0;
					imageData.data[i+3]=255;
					i+=4;
					
					
				}
			}
			
			this.context.putImageData(imageData,0,0);
			
			
		},
		
		prosessStep:function(){
		
			var imageData = virusHandler.context.getImageData(0,0,virusHandler.config.x,virusHandler.config.y);
			var pointer = 0;
			for(var y=0;y<=imageData.height;y++){
				for(var x=0;x<=imageData.width;x++){
					var heal=0;
					var imune=0;
					// here we have transition rules hardcoded - please be kind and export them to separate method :)
					for  (var c=pointer-(virusHandler.config.x*4);c<=pointer+(virusHandler.config.x*4);c+=virusHandler.config.x*4){
					for (var k=-4;k<=4;k+=4){
						if (k==0){
							continue;
						}
						if (imageData.data[c+k]==2){
							heal-=0.2*imageData.data[c+k+1];
							
						}
						if (imageData.data[c+k]==3){
							heal+=0.2*imageData.data[c+k+1];
						}
						
						if (k==-4){
							if(imageData.data[c+k]==2){
								imageData.data[pointer]=1;
							}
						}
						
					}
					}
					
					imageData.data[pointer+1]+=heal;
					
					if(imageData.data[pointer+1]<=0){
						imageData.data[pointer]=3;
						imageData.data[pointer+1]=0;
					}
					if(imageData.data[pointer+1]>250){
						imageData.data[pointer+1]=250;
						imageData.data[pointer]=2;
						
					}
					if(imageData.data[pointer]==1){
						imageData.data[pointer+1]+=5;
						
						
					}
					if(imageData.data[pointer]==2){
						imageData.data[pointer+1]-=5;
						
						
					}
					
					pointer+=4;
				}
				
			}
			virusHandler.context.putImageData(imageData,0,0);
			
		
		},
		
	};
	
})(this);

virusHandler.initCanvas("canvasElement");
virusHandler.initPopulation();


var s = window.setInterval(virusHandler.prosessStep,90);