angular.module('project', []);

function Main($scope,$http) {
    $http.post('index.php/dictionary').success(function (data) {
        $scope.categories = data.dictionary;
        

    })

    $scope.selectCat = function(id){
        $http.post('index.php/tag/',{'term':id.category.id}).success(function (data) {
            console.log(data);
            $scope.result = data.prid;
            for(var i in $scope.result){
                $scope.result[i].active = false;
                
            }

        })

    };

     $scope.search = function(term){
        $http.post('index.php/search/',{'term':term}).success(function (data) {
            $scope.tags = data.search;
        })

        $scope.searchVids();
    };

    $scope.openItem = function(current){
        console.log(current);
        for(var i in $scope.result){
            $scope.result[i].active = false;
            
        }
        current.item.active = true;
        
        createPlayer(current.$index,current.item.prid,current.item.starttijd);

        
    }


    var createPlayer = function(index,prid,starttijd){
        var starttijd = parseInt(starttijd)/1000;
        console.log(starttijd);
        console.log({
                   width: "100%",
                   height: 414,
                   prid: prid,
                    options: {
                       startAt: starttijd 
                    }
                    });
        var prid = prid;
         var index = index;
         setTimeout(function(){
                npoplayer("video"+index).setup(
                 {
                   width: "100%",
                   height: 414,
                   prid: prid,
                    options: {
                       startAt: starttijd 
                    }
                    }
                );
            },100);

    }


    var active = false;
    $scope.searchVids = function(){

        if(active === false){
            setTimeout(function(){
                console.log('zoek');
                active = false;
            },10000);

            active = true;

        }
        
    }
      
      $scope.tags = ['Eekhoorn','Vos','Das','Huismus','Uil']; 
     //$scope.categories = ['Vogels','Planten','Vissen','Zoogdieren','Vleermuizen'];
      $scope.activeCat = 'Geen';

   /* npoplayer("npo_wrapper").setup(
           {
               width: "100%",
               height: 414,
               prid: "POW_00635251"
           }
       );*/
   }