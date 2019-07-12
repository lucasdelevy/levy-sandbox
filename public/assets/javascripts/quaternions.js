var x1, y1, z1;         // original vector
var x2, y2, z2;         // rotated vector
var alpha, beta, gamma; // euler angles
var w, x, y, z;         // quaternions
function getValues()
{
  graph_div   = document.getElementById('plot_div');
  x1          = document.getElementById('original_x1');
  y1          = document.getElementById('original_y1');
  z1          = document.getElementById('original_z1');
  x2          = document.getElementById('rotated_x1');
  y2          = document.getElementById('rotated_y1');
  z2          = document.getElementById('rotated_z1');
  alpha       = document.getElementById('euler_alpha');
  beta        = document.getElementById('euler_beta');
  gamma       = document.getElementById('euler_gamma');
  w           = document.getElementById('quat_w');
  x           = document.getElementById('quat_x');
  y           = document.getElementById('quat_y');
  z           = document.getElementById('quat_z');
}

function originVectorUpdate()
{
  graph_div   = document.getElementById('plot_div');
  x1          = document.getElementById('original_x1').value;
  y1          = document.getElementById('original_y1').value;
  z1          = document.getElementById('original_z1').value;

  console.log(
    x1,
    y1,
    z1);

  graph_div.data[0].x[1] = x1;
  graph_div.data[0].y[1] = y1;
  graph_div.data[0].z[1] = z1;

  Plotly.redraw(graph_div);
}

function eulerAngleUpdate()
{
  getValues();

  // Convert from degrees to radian
  alpha_value = alpha.value*1.0/180*Math.PI;
  beta_value  = beta.value*1.0/180*Math.PI;
  gamma_value = gamma.value*1.0/180*Math.PI;

  // Apply euler angles
  var euler = new THREE.Euler(alpha_value, beta_value, gamma_value, 'XYZ');
  var vector = new THREE.Vector3(x1.value, y1.value, z1.value);
  vector.applyEuler(euler);
  
  // Treat small values
  vector.x = Math.abs(vector.x) < 0.001 ? 0 : vector.x;
  vector.y = Math.abs(vector.y) < 0.001 ? 0 : vector.y;
  vector.z = Math.abs(vector.z) < 0.001 ? 0 : vector.z;

  // Update graph
  graph_div.data[1].x[1] = vector.x;
  graph_div.data[1].y[1] = vector.y;
  graph_div.data[1].z[1] = vector.z;

  // Update text entries
  x2.value = parseFloat(vector.x).toFixed(4);
  y2.value = parseFloat(vector.y).toFixed(4);
  z2.value = parseFloat(vector.z).toFixed(4);

  var new_quaternion = new THREE.Quaternion().setFromEuler(euler, 'XYZ');
  w.value = parseFloat(new_quaternion._w).toFixed(4);
  x.value = parseFloat(new_quaternion._x).toFixed(4);
  y.value = parseFloat(new_quaternion._y).toFixed(4);
  z.value = parseFloat(new_quaternion._z).toFixed(4);

  Plotly.redraw(graph_div);
}

function quaternionUpdate()
{
  getValues();

  // Apply quaternions
  var quaternion = new THREE.Quaternion(x.value, y.value, z.value, w.value);
  var vector = new THREE.Vector3(x1.value, y1.value, z1.value);
  vector.applyQuaternion(quaternion);

  // Update graph
  graph_div.data[1].x[1] = vector.x;
  graph_div.data[1].y[1] = vector.y;
  graph_div.data[1].z[1] = vector.z;

  // Update text entries
  x2.value = parseFloat(vector.x).toFixed(4);
  y2.value = parseFloat(vector.y).toFixed(4);
  z2.value = parseFloat(vector.z).toFixed(4);

  var new_euler = new THREE.Euler().setFromQuaternion(quaternion.normalize(), 'XYZ')
  console.log(new_euler)
  alpha.value = parseFloat(new_euler._x*1.0/Math.PI*180).toFixed(4);
  beta.value  = parseFloat(new_euler._y*1.0/Math.PI*180).toFixed(4);
  gamma.value = parseFloat(new_euler._z*1.0/Math.PI*180).toFixed(4);

  Plotly.redraw(graph_div);
}

function rotatedVectorUpdate()
{
  graph_div  = document.getElementById('plot_div');
  rotated_x1 = document.getElementById('rotated_x1').value;
  rotated_y1 = document.getElementById('rotated_y1').value;
  rotated_z1 = document.getElementById('rotated_z1').value;

  console.log(
    rotated_x1,
    rotated_y1,
    rotated_z1);

  graph_div.data[1].x[1] = rotated_x1;
  graph_div.data[1].y[1] = rotated_y1;
  graph_div.data[1].z[1] = rotated_z1;
  
  // update everything else

  Plotly.redraw(graph_div);
}

function mainfunction()
{
  // Preventing form submission to reload page
  $("#original_vector_form").submit(
    function(e)
    {
      e.preventDefault();
    }
  );

  $("#euler_angles_form").submit(
    function(e)
    {
      e.preventDefault();
    }
  );

  $("#quaternions_form").submit(
    function(e)
    {
      e.preventDefault();
    }
  );

  $("#rotated_vector_form").submit(
    function(e)
    {
      e.preventDefault();
    }
  );

  // Initial plot
  var trace1 =
  {
    x: [0, 0],
    y: [0, 1],
    z: [0, 0],
    type: 'scatter3d',
    mode: 'lines',
    line:
    {
      width: 6,
      colorscale: "Viridis"
    },
    marker:
    {
      size: 3.5,
      colorscale: "Greens",
      cmin: -20,
      cmax: 50
    },
    name: 'original'
  };

  var trace2 = 
  {
    x: [0, 0],
    y: [0, 1],
    z: [0, 0],
    type: 'scatter3d',
    mode: 'lines',
    line:
    {
      width: 6,
      colorscale: "Viridis"
    },
    marker:
    {
      size: 3.5,
      colorscale: "Greens",
      cmin: -20,
      cmax: 50
    },
    name: 'rotated'
  };

  var data = [trace1, trace2];

  var layout =
  {
    margin:
    {
      l: 0,
      r: 0,
      b: 0,
      t: 0
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    scene:
    {
      aspectmode: "manual",
      aspectratio:
      {
        x: 1, y: 0.7, z: 1
      },
      xaxis:
      {
        nticks: 5,
        range: [-3.1, 3.1]
      },
      yaxis:
      {
        nticks: 5,
        range: [-3.1, 3.1]
      },
      zaxis:
      {
        nticks: 5,
        range: [-3.1, 3.1]
      },
      camera:
      {
        center:
        {
            x: 0, 
            y: 0, 
            z: 0
        }, 
        eye:
        {
            x: 1.2885447206631766, 
            y: -1.3566671403589505, 
            z: 0.3440047239455235
        }, 
        up:
        {
            x: 0, 
            y: 0, 
            z: 1
        }
    }
    }
  };

  Plotly.newPlot('plot_div', data, layout);
}

$(document).on('turbolinks:load', mainfunction); // Turbolinks 5

// Plotly.newPlot("8e43f415-64a0-474a-909d-02174c717b20",
//   [
//     {
//       "showlegend": true,
//       "cmax": 1,
//       "uid": "90d157",
//       "zsrc": "lucasdelevy:0:936e3c",
//       "ysrc": "lucasdelevy:0:9f0614",
//       "xsrc": "lucasdelevy:0:f2abf4",
//        "name": "Teste1",
//        "marker": {"symbol": "*",
//        "sizeref": 0},
//        "mode": "lines+markers",
//        "y": ["1",
//        "0",
//        ""],
//        "x": ["0",
//        "0",
//         ""],
//         "z": ["0",
//         "0"],
//         "type": "scatter3d",
//         "cmin": 0
//       },
//       {
//         "uid": "09acc6",
//         "zsrc": "lucasdelevy:0:342c04",
//         "ysrc": "lucasdelevy:0:1efad1",
//         "xsrc": "lucasdelevy:0:f46851",
//         "visible": true,
//         "hoverinfo": "x+y+z+name",
//         "y":
//         [
//           "0",
//           "0"
//         ],
//         "x":
//         [
//           "1",
//           "0"
//         ],
//           "z":
//         [
//           "1",
//           "0"
//         ],
//         "type": "scatter3d",
//         "name": "Teste0"
//       }
//     ],
//     {
//       "autosize": true,
//       "yaxis": {"type": "linear",
//       "title": "B"},
//       "title": "no",
//       "scene": {"aspectratio": {"y": 1,
//       "x": 1,
//       "z": 1},
//       "camera": {"eye": {"y": 1.064269242905534,
//    "x": 1.6361025817119814,
//             "z": 0.6242873817508187},
//             "up": {"y": 0,
//             "x": 0,
//             "z": 1},
//             "center": {"y": 0,
//             "x": 0,
//             "z": 0}},
//             "dragmode": "turntable"},
//             "height": 842.875,
//             "width": 1500,
//              "zaxis": {"title": "C"},
//              "xaxis": {"type": "linear",
//              "title": "A"},
//              "hovermode": "closest",
//              "showlegend": true,
//              "legend": {"yanchor": "middle",
//              "traceorder": "normal",
//               "xanchor": "left"}},
//               {"linkText": "Export to plot.ly",
//               "showLink": true})