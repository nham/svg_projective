// http://stackoverflow.com/a/4673436/3109948
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}


// given array of numbers [x1, ..., x{2k}]
// returns a string "x1 x2, x3 x4, ..., x{2k-1} x{2k}"
// used for svg paths
var coordArrayToStr = function(arr) {
    var s = "";
    for (var i = 0; i < arr.length; i++) {
        if(i > 0) {
            if (i % 2 === 0) {
                s += ", ";
            } else {
                s += " ";
            }
        }
        s += arr[i];
    }

    return s;
};

// returns an array of coordinates, each representing the vertices of
// a grid with num_rows rows, num_cols cols, and with hsp and vsp 
// horizontal and vertical distance between points, respectively.
//
// also the top-left coordinate is specified by top_left.
//
// coordinates are an array of 2 numbers, [x_coord, y_coord]
var gridCoords = function(top_left, num_rows, num_cols, hsp, vsp) {
    var coords = [];
    for(var i = 0; i < num_rows; i++) {
        for(var j = 0; j < num_cols; j++) {
            var p = [top_left[0] + j*hsp, top_left[1] + i*vsp];
            coords.push(p);
        }
    }
    return coords;
};


// utility function for working with coordinate arrays, of the same
// form that gridCoords() returns.
//
// expects: (arr, i_1, ..., i_k)
// where arr = [a_1, ..., a_n] and each a_i is a 2-element array
// and each i_j is an integer
// and returns an array [a_{i_1}[0], a_{i_1}[1], ..., a_{i_k}[0], a_{i_k}[1]]
//
// essentially, it selects the coordinates i_1 through i_k and flattens
// them into a single-level array
var select_flatten = function(arr, indices) {
    var tmp = [];
    for(var i = 0; i < indices.length; i++) {
        tmp.push(arr[indices[i]][0]);
        tmp.push(arr[indices[i]][1]);
    }
    return tmp;
};
