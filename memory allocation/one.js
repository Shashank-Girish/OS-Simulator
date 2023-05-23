var getValue = document.getElementById('mybtn');
selectOption  = document.getElementById('select_id');
btnCalculate = document.getElementById('btnCalculate');
selectedmethod = document.getElementById("selectedmethod");
var count=0;
var countTwo=0;
var countNumberOfClicks = 1;
var countJobs =1;
var jobBlocks = [];
var memoryBlocks = [];
var message;

// when button submit is clicked 
getValue.addEventListener('click' , AddJobsBlock);
btnCalculate.addEventListener('click' , Calculate);


function Calculate(){

    if (selectedmethod.options[0].selected === true) {
      bestFit();
    } else if (selectedmethod.options[1].selected === true) {
      firstFit();
    } else if (selectedmethod.options[2].selected === true) {
      worstFit();
    } else {
      var getValue = document.getElementsByClassName(".alert-btn");
      getValue.setAttribute("display ", "none");
    }
 
   
}

function firstFit(){
    var geTable =  document.getElementById('mainTable');
    var counter =0 ;
    var sum = 0;
    for(var i = 0 ; i < memoryBlocks.length ; i++){
        if(parseInt(jobBlocks[counter])  <= parseInt(memoryBlocks[i])){
            console.log(parseInt(jobBlocks[i] + " " + i)) // to be removed
            message = 'Calculated';    
            var difference = parseInt(memoryBlocks[i]) - parseInt(jobBlocks[counter]);
            sum +=difference;
            geTable.innerHTML += '<tr> ' + '<td>' +'Job '+(i+1) + '</td>' + '<td>' + 'Block '+i+'</td>' + '<td>' +difference+ '</td>' + '<td>' +message+ '</td>' +   '</tr>'
            counter++;
        }
        else{
            message = 'Job Size cannot fit';
            geTable.innerHTML += '<tr> ' + '<td>' +'Job '+(i+1) + '</td>' + '<td>' + 'Block '+i+'</td>' + '<td>' +0+ '</td>' + '<td>' +message+ '</td>' +   '</tr>'
        } 
    }
    geTable.innerHTML += '<tr> ' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' +'Total =' +sum+ '</td>' + '<td>' + '</td>' +   '</tr>'
    geTable.lastChild.classList.add('last');
} // end of fisrt fit


function bestFit(){
    var geTable =  document.getElementById('mainTable');
    var counter =0 ;
    var sum = 0;
    var goal = 0
    var closest

    for(var i = 0 ; i < memoryBlocks.length ; i++ ){
        goal = jobBlocks[counter];
        
        closest = memoryBlocks.reduce(function(prev, curr) {
            return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
          });
          if(closest < jobBlocks[counter]){
            message = 'Job Size cannot fit';
            geTable.innerHTML += '<tr> ' + '<td>' +'Job '+(i+1) + '</td>' + '<td>' + 'Block '+i+'</td>' + '<td>' +0+ '</td>' + '<td>' +message+ '</td>' +   '</tr>'
        }
        else{
            message = 'calculated';
            var fragment = closest - jobBlocks[counter];
            geTable.innerHTML += '<tr> ' + '<td>' +'Job '+(i+1) + '</td>' + '<td>' + 'Block '+i+'</td>' + '<td>' +fragment+ '</td>' + '<td>' +message+ '</td>' +   '</tr>'
            jobBlocks[counter] =-1000; 
        }
        counter++;
    }
    // ska lebala  esebetsa fela ka nomoro tse atometseng  ......NB  

}// end of Best fit


function worstFit(){
    var geTable =  document.getElementById('mainTable');
    var difference;
    var maxValue = memoryBlocks[0];
    for (let index = 0; index < jobBlocks.length; index++) {
        
        for(var i = 0; i < memoryBlocks.length; i++) {
            if(memoryBlocks[i] > maxValue) {
            maxValue = memoryBlocks[i];
        }
        var ie = memoryBlocks.indexOf(maxValue) ;
         difference = maxValue - jobBlocks[index]
         memoryBlocks[ie] = -1;
    }
    if(maxValue > jobBlocks[index]){
        message = 'Job can fit';
        geTable.innerHTML += '<tr> ' + '<td>' +'Job '+(index) + '</td>' + '<td>' + 'Block '+index + 1 +'</td>' + '<td>' +difference+ '</td>' + '<td>' +message+ '</td>' +   '</tr>'
    }
    else{
        message = 'Job cannot fit';
        geTable.innerHTML += '<tr> ' + '<td>' +'Job '+(index) + '</td>' + '<td>' + 'Block '+index + 1 +'</td>' + '<td>' +0+ '</td>' + '<td>' +message+ '</td>' +   '</tr>'
    }
          
}


}

// create the table 
function AddJobsBlock(e){
    e.preventDefault();
    var geTable =  document.getElementById('myBody');
    var geTableTwo =  document.getElementById('myBodyTwo');
    var getValue = document.getElementById('mytxt').value;
    var clearText = document.getElementById('mytxt');
// check to see if the first option is selected
    if(selectOption.options[0].selected === true){
        count++;
        for(var i = 0 ; i< count ;i++ ){
            if(count === count ){
                geTable.innerHTML +='<tr> ' + '<td>' +count+ '</td>' + '<td>' + getValue + ' Kb'+'</td>' + ' </tr>' ;
                jobBlocks.push(getValue);
                clearText.value = "";
                console.log('option1');
                break;
            }
        }   
    }

// check to see if the second option is selected
    if(selectOption.options[1].selected === true){
        countTwo++;
        for(var i = 0 ; i< countTwo ;i++ ){
            if(countTwo === countTwo ){
                geTableTwo.innerHTML +='<tr> ' + '<td>' +countTwo+ '</td>' + '<td>' + getValue + ' Kb'+'</td>' + ' </tr>' ;
                memoryBlocks.push(getValue);
                clearText.value = "";
                console.log('option2');
                break;
            }
        } 
    }    
} // end of block











    












