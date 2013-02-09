$(function () {

  prediction = [];
  verdict = [];
  function percent(a,b) {
    return(parseInt(a)/parseInt(b)*100)
  }


  function getEagerness(){
    var eagerness = 0;
    eagerness_coefficient = 33;

    var table = {
      quiz: 15,
      homework: 5,
      project: 5,
      midterm: 3,
      final: 5 
    }

    if( isNaN(fetchQuiz()) ){
      eagerness_coefficient -= table["quiz"];
    }else{
      eagerness += fetchQuiz() * table["quiz"];
    }

    if( isNaN(fetchHomework()) ){
      eagerness_coefficient -= table["homework"];
    }else{
      eagerness += fetchHomework() * table["homework"];
    }

    if( isNaN(fetchProject()) ){
      eagerness_coefficient -= table["project"];
    }else{
      eagerness += fetchProject() * table["project"];
    }


    if( isNaN(fetchMidterm()) ){
      eagerness_coefficient -= table["midterm"];
    }else{
      eagerness += fetchMidterm() * table["midterm"];
    }


    if( isNaN(fetchFinal()) ){
      eagerness_coefficient -= table["final"];
    }else{
      eagerness += fetchFinal() * table["final"];
    }

    eagerness = eagerness / (eagerness_coefficient * 100) ;

    return eagerness;
  }

  function getConsistency(){
    consistency = 0;
    consistency_coefficient = 28;

    var table = {
      quiz: 3,
      homework: 15,
      project: 2,
      midterm: 5,
      final: 3 
    }

    if( isNaN(fetchQuiz()) ){
      consistency_coefficient -= table["quiz"];
    }else{
      consistency += fetchQuiz() * table["quiz"];
    }

    if( isNaN(fetchHomework()) ){
      consistency_coefficient -= table["homework"];
    }else{
      consistency += fetchHomework() * table["homework"];
    }

    if( isNaN(fetchProject()) ){
      consistency_coefficient -= table["project"];
    }else{
      consistency += fetchProject() * table["project"];
    }


    if( isNaN(fetchMidterm()) ){
      consistency_coefficient -= table["midterm"];
    }else{
      consistency += fetchMidterm() * table["midterm"];
    }


    if( isNaN(fetchFinal()) ){
      consistency_coefficient -= table["final"];
    }else{
      consistency += fetchFinal() * table["final"];
    }

    consistency = consistency / (consistency_coefficient * 100) ;

    return consistency;
  }

  function getDiskarte(){
    // coefficient_prime = 24;
    // bs =  fetchQuiz()     * 0.02 ;
    // bs += fetchHomework() * 0.03 ;
    // bs += fetchProject()  * 0.15 ;
    // bs += fetchMidterm()  * 0.02 ;
    // bs += fetchFinal()    * 0.02 ;
    // bs = bs / coefficient_prime;
    diskarte = 0;
    diskarte_coefficient = 24;

    var table = {
      quiz: 2,
      homework: 3,
      project: 15,
      midterm: 2,
      final: 2 
    }

    if( isNaN(fetchQuiz()) ){
      diskarte_coefficient -= table["quiz"];
    }else{
      diskarte += fetchQuiz() * table["quiz"];
    }

    if( isNaN(fetchHomework()) ){
      diskarte_coefficient -= table["homework"];
    }else{
      diskarte += fetchHomework() * table["homework"];
    }

    if( isNaN(fetchProject()) ){
      diskarte_coefficient -= table["project"];
    }else{
      diskarte += fetchProject() * table["project"];
    }


    if( isNaN(fetchMidterm()) ){
      diskarte_coefficient -= table["midterm"];
    }else{
      diskarte += fetchMidterm() * table["midterm"];
    }


    if( isNaN(fetchFinal()) ){
      diskarte_coefficient -= table["final"];
    }else{
      diskarte += fetchFinal() * table["final"];
    }

    diskarte = diskarte / (diskarte_coefficient * 100) ;

    return diskarte;
  }

  function getUselessKnowledge(){
    // bs =  fetchQuiz()     * 0.05 ;
    // bs += fetchHomework() * 0.02 ;
    // bs += fetchProject()  * 0.03 ;
    // bs += fetchMidterm()  * 0.15 ;
    // bs += fetchFinal()    * 0.15 ;
    // bs = bs / coefficient_prime;

    retention = 0;
    retention_coefficient = 40;

    var table = {
      quiz: 5,
      homework: 2,
      project: 3,
      midterm: 15,
      final: 15 
    }

    if( isNaN(fetchQuiz()) ){
      retention_coefficient -= table["quiz"];
    }else{
      retention += fetchQuiz() * table["quiz"];
    }

    if( isNaN(fetchHomework()) ){
      retention_coefficient -= table["homework"];
    }else{
      retention += fetchHomework() * table["homework"];
    }

    if( isNaN(fetchProject()) ){
      retention_coefficient -= table["project"];
    }else{
      retention += fetchProject() * table["project"];
    }


    if( isNaN(fetchMidterm()) ){
      retention_coefficient -= table["midterm"];
    }else{
      retention += fetchMidterm() * table["midterm"];
    }


    if( isNaN(fetchFinal()) ){
      retention_coefficient -= table["final"];
    }else{
      retention += fetchFinal() * table["final"];
    }

    retention = retention / (retention_coefficient * 100) ;

    return retention;

  }

  function fetchFinal() {
    ave = percent( $("#finals_score").val(), $('#finals_total').val() );
    // if ( !isNaN(ave) ) { prediction.push(ave) }
    return ave
  }

  function fetchQuiz() {
    ave = percent( $("#quizzes_score").val(), $('#quizzes_total').val() );
    // if ( !isNaN(ave) ) { prediction.push(ave) }
    return ave
  }

  function fetchHomework() {
    ave =  percent ($("#homeworks_score").val() , $("#homeworks_total").val() )
    // if ( !isNaN(ave) ) { prediction.push(ave) }
    return ave
  }

  function fetchMidterm() {
    ave =  percent ($("#midterms_score").val() , $("#midterms_total").val() )
    // if ( !isNaN(ave) ) { prediction.push(ave) }
    return ave
  }

  function fetchProject() {
    ave =  percent ($("#projects_score").val() , $("#projects_total").val() )
    // if ( !isNaN(ave) ) { prediction.push(ave) }
    return ave
  }

  function fetchTerrorLevel() {
    return "Terror level is " + $('#terror_level').val()
  }

  function makePrediction() {
    prediction = ['Predictions : '];

    var eagerness = getEagerness();
    var consistency = getConsistency();
    var diskarte = getDiskarte();
    var retention = getUselessKnowledge();
    var pass = 0;
    var fail = 0;

    if( !isNaN(eagerness) ){
      // 1 .. .7
      if( eagerness > .8 ){
        pass += 2;
        prediction.push("(Eagerness++) 'When a man is willing and eager, the gods will join in' - Aeschylus");
      // .7 .. .5
      }else if( eagerness <= .8 && eagerness > .6){
        pass += 1;
        prediction.push("(Eagerness+) You are on the right track. Keep your spirits up!");
     // .5 .. .3
      }else if( eagerness <= .6 && eagerness > .3 ){
        fail += 1;
        prediction.push("(Eagerness-) You have to do better than that.");
      }else if( eagerness <= .3 ){
        fail += 2;
        prediction.push("(Eagerness--) I don't think you want to pass this subject enough.");
      }
    };
    
    if( !isNaN(consistency) ){
      // 1 .. .7
      if( consistency > .8 ){
        pass += 2;
        prediction.push("(Consistency++) Solid performance!");
      // .7 .. .5
      }else if( consistency <= .8 && consistency > .6){
        pass += 1;
        prediction.push("(Consistency+) Those small victories will eventually add up. good job.");
     // .5 .. .3
      }else if( consistency <= .6 && consistency > .3 ){
        fail += 1;
        prediction.push("(Consistency-) You are bad. and you should feel bad.");
      }else if( consistency <= .3 ){
        fail += 2;
        prediction.push("(Consistency--) The only thing you are consistent at is being bad.");
      }
    };

    if( !isNaN(diskarte) ){
      // 1 .. .7
      if( diskarte > .8 ){
        pass += 2;
        prediction.push("(Diskarte++) 'Nothing is a waste of time if you use the experience wisely.' - Auguste Rodin");
      // .7 .. .5
      }else if( diskarte <= .8 && diskarte > .6){
        pass += 1;
        prediction.push("(Diskarte+) 'You can always find a capable helping hand at the end of your own sleeve.' - Zig Ziglar");
     // .5 .. .3
      }else if( diskarte <= .6 && diskarte > .3 ){
        fail += 1;
        prediction.push("(Diskarte-) 'The meek shall inherit the earth - but not its minerals'");
      }else if( diskarte <= .3 ){
        fail += 2;
        prediction.push("(Diskarte--) 'It’s not the lack of resources, it’s your lack of resourcefulness that stops you.' - Tony Robbins");
      }
    };

    if( !isNaN(retention) ){
      // 1 .. .7
      if( retention > .8 ){
        pass += 2;
        prediction.push("(Retention++) You are a quiz and exams ace!");
      // .7 .. .5
      }else if( retention <= .8 && retention > .6){
        pass += 1;
        prediction.push("(Retention+)  You are good at storing useless knowle... err.. memorizing things. That's great!");
     // .5 .. .3
      }else if( retention <= .6 && retention > .3 ){
        fail += 1;
        prediction.push("(Retention-) You need to study harder!");
      }else if( retention <= .3 ){
        fail += 2;
        prediction.push("(Retention--) You need to pull of a miracle.");
      }
    };

    fetchTerrorLevel();

    console.log(pass);
    console.log(fail);
    if(fail > pass){
      $('#verdict').text('You will fail.').removeClass('success').addClass('alert');
    }else if( fail < pass ){
      $('#verdict').text('You shall pass.').removeClass('alert').addClass('success');
    }else if( fail !== 0 && pass !== 0 ){
      $('#verdict').text('50/50').removeClass('alert').removeClass('success');
    }

    if (prediction.length > 0 && (pass !== 0 || fail !== 0)) {
      $('#prediction').html(prediction.join('<br><br>'));
      // $('#predict').hide('slow');
      $('#verdict').show('fast');
      $('#prediction').show('fast');
    }
  };


  $('#predict').on('click', makePrediction);

});
