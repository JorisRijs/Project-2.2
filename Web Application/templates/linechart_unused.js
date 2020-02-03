// dewpoint realtime in grafiek. tot twee minuten terug.
        var ctx = document.getElementById('dewpoint_graph');
        var data_linechart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        linechart = new Chart(ctx,{
            type: 'line',
            data: {
                labels: [120, 115, 110, 105, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0],
                datasets: [{
                    data: data_linechart,
                    label: "Dewpoint",
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    borderColor: 'rgba(0, 0, 0, 0.8)',
                    fill: false
                }]
            },
            options: {
                title:{
                    display: true,
                    text: "Dewpoint in degrees C"
                },
                scales: {
                  yAxes:[{
                    position: 'right'
                  }]
                },

                responsive: false
            }

         });
        // functie voor het simuleren van een datastroom, wordt tzt vervangen door de 'echte' datastroom
        function simulateData(){
            setInterval(function () {
            var ran_dewpoint = Math.floor(Math.random() * 24 + 10);
            refreshData(ran_dewpoint);
          },5000)
        }

        //functie voor het verversen van de grafiek.
        function refreshData(new_data){
          data_linechart.shift();
          data_linechart.push(new_data);
          linechart.update();
        }

          simulateData();
