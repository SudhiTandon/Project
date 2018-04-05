var demoAng = angular.module('demoAng', []);

demoAng.controller('myCntrl', function ($scope, findNumber) {
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };
    $scope.fnConvert = function(){
        $scope.outputNumber = '';
        var a = 0;
        for (i=85; i<=$scope.content.length; i+=85){
            $scope.row = $scope.content.slice(a,i);
            var b = 0;
            var c = 28;
            var d = 31;
            var e = 56;
            var f = 59;
            for(j=3; j<=27; j+=3){
                $scope.character = $scope.row.slice(b,j);
                b = j;
                $scope.character = $scope.character + $scope.row.slice(c,d);
                c = d;
                d += 3;
                $scope.character = $scope.character + $scope.row.slice(e,f);
                e = f;
                f += 3;
                $scope.outputNumber = $scope.outputNumber + findNumber.numberValue($scope.character);
            }
            $scope.outputNumber = $scope.outputNumber + '\n' + '\n' + '\n' + '\n';
            var a = i;
        }
        $scope.file = true;
    }
});

demoAng.factory('findNumber',function(){
    return {
        numberValue: function(data) {
            if (" _ | ||_|" === data) {
                value = '0';
            } else if ("     |  |" === data) {
                value = '1';
            } else if (" _  _||_ " === data) {
                value = '2';
            } else if (" _  _| _|" === data) {
                value = '3';
            } else if ("   |_|  |" === data) {
                value = '4';
            } else if (" _ |_  _|" === data) {
                value = '5';
            } else if (" _ |_ |_|" === data) {
                value = '6';
            } else if (" _   |  |" === data) {
                value = '7';
            } else if (" _ |_||_|" === data) {
                value = '8';
            } else if (" _ |_| _|" === data) {
                value = '9';
            } else value = 'Not a Number';
            return value;
        }
    };
});

demoAng.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});