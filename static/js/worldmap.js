/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();


// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name} \n {no_stations}";
polygonTemplate.fill = am4core.color("#74B266");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#1BBC9B");

// Remove Antarctica
polygonSeries.exclude = ["AQ"];

// Add some data
polygonSeries.data =
[{
    "id": "RO",
    "name": "Romania",
    "fill": am4core.color("#00796B"),
    "no_stations": 'number of stations: ' + 44
}, {
    "id": "MD",
    "name": "Moldova",
    "fill": am4core.color("#1BD0D0"),
    "no_stations": 'number of stations: ' + 3
}, {
    "id": "EE",
    "name": "Estonia",
    "fill": am4core.color("#00796B"),
    "no_stations": 'number of stations: ' + 8
}, {
    "id": "LV",
    "name": "Latvia",
    "fill": am4core.color("#00796B"),
    "no_stations": 'number of stations: ' + 14
}, {
    "id": "LT",
    "name": "Lithuania",
    "fill": am4core.color("#00796B"),
    "no_stations": 'number of stations: ' + 15
}, {
    "id": "RU",
    "name": "Russia",
    "fill": am4core.color("#00796B"),
    "no_stations": 'number of stations: ' + 277
}, {
    "id": "UA",
    "name": "Ukraine",
    "fill": am4core.color("#00796B"),
    "no_stations": 'number of stations: ' + 60
}, {
    "id": "BY",
    "name": "Belarus",
    "fill": am4core.color("#00796B"),
    "no_stations": 'number of stations: ' + 19
}];

// Bind "fill" property to "fill" key in data
polygonTemplate.propertyFields.fill = "fill";

// Create image series
var imageSeries = chart.series.push(new am4maps.MapImageSeries());

// Create a circle image in image series template so it gets replicated to all new images
var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 3;
circle.fill = am4core.color("#B27799");
circle.stroke = am4core.color("#00796B");
circle.strokeWidth = 1;
circle.nonScaling = true;
circle.tooltipText = "{title}";

// Set property fields
imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";

imageSeries.data = [{'latitude': 47.933, 'longitude': 23.917, 'title': 'Sighetul Marmatiei'}, {'latitude': 47.717, 'longitude': 22.883, 'title': 'Satu Mare'}, {'latitude': 47.667, 'longitude': 23.5, 'title': 'Baia Mare'}, {'latitude': 47.733, 'longitude': 23.95, 'title': 'Ocna Sugatag'}, {'latitude': 47.733, 'longitude': 26.65, 'title': 'Botosani'}, {'latitude': 47.633, 'longitude': 26.25, 'title': 'Suceava'}, {'latitude': 47.033, 'longitude': 21.9, 'title': 'Oradea'}, {'latitude': 47.167, 'longitude': 27.633, 'title': 'Iasi'}, {'latitude': 46.983, 'longitude': 25.95, 'title': 'Ceahlau Toaca'}, {'latitude': 46.783, 'longitude': 23.567, 'title': 'Cluj-Napoca'}, {'latitude': 46.533, 'longitude': 24.533, 'title': 'Tg. Mures'}, {'latitude': 46.533, 'longitude': 26.917, 'title': 'Bacau'}, {'latitude': 46.367, 'longitude': 25.733, 'title': 'Miercurea Ciuc'}, {'latitude': 46.233, 'longitude': 27.65, 'title': 'Barlad'}, {'latitude': 46.133, 'longitude': 21.35, 'title': 'Arad'}, {'latitude': 46.167, 'longitude': 21.317, 'title': 'Arad'}, {'latitude': 45.867, 'longitude': 22.9, 'title': 'Deva'}, {'latitude': 45.767, 'longitude': 21.25, 'title': 'Timisoara'}, {'latitude': 45.8, 'longitude': 24.15, 'title': 'Sibiu'}, {'latitude': 45.45, 'longitude': 25.45, 'title': 'Varfu Omu'}, {'latitude': 45.417, 'longitude': 22.25, 'title': 'Caransebes'}, {'latitude': 45.483, 'longitude': 28.033, 'title': 'Galati'}, {'latitude': 45.183, 'longitude': 28.817, 'title': 'Tulcea'}, {'latitude': 45.033, 'longitude': 21.683, 'title': 'Oravita'}, {'latitude': 45.1, 'longitude': 24.367, 'title': 'Rimnicu Valcea'}, {'latitude': 45.133, 'longitude': 26.85, 'title': 'Buzau'}, {'latitude': 45.167, 'longitude': 29.733, 'title': 'Sulina'}, {'latitude': 44.85, 'longitude': 24.817, 'title': 'Pitesti'}, {'latitude': 44.95, 'longitude': 26.0, 'title': 'Ploiesti'}, {'latitude': 44.717, 'longitude': 21.633, 'title': 'Moldova Veche'}, {'latitude': 44.75, 'longitude': 27.3, 'title': 'Grivita'}, {'latitude': 44.767, 'longitude': 28.883, 'title': 'Jurilovca'}, {'latitude': 44.633, 'longitude': 22.633, 'title': 'Drobeta Turnu Sever'}, {'latitude': 44.483, 'longitude': 26.117, 'title': 'Bucuresti Inmh-Bane'}, {'latitude': 44.483, 'longitude': 26.183, 'title': 'Bucuresti Afumati'}, {'latitude': 46.5, 'longitude': 23.883, 'title': 'Campia Turzii'}, {'latitude': 44.367, 'longitude': 27.85, 'title': 'Fetesti'}, {'latitude': 44.317, 'longitude': 23.867, 'title': 'Craiova'}, {'latitude': 44.2, 'longitude': 27.333, 'title': 'Calarasi'}, {'latitude': 44.1, 'longitude': 24.983, 'title': 'Rosiori De Vede'}, {'latitude': 44.217, 'longitude': 28.65, 'title': 'Constanta'}, {'latitude': 44.333, 'longitude': 28.433, 'title': 'Kogalniceanu'}, {'latitude': 43.75, 'longitude': 24.883, 'title': 'Tr. Magurele'}, {'latitude': 43.817, 'longitude': 28.583, 'title': 'Mangalia'}, {'latitude': 76.85, 'longitude': 68.55, 'title': 'Mys Zelanija'}, {'latitude': 76.183, 'longitude': 63.567, 'title': 'Russkaya Gavan`'}, {'latitude': 72.367, 'longitude': 52.7, 'title': 'Malye Karmakuly'}, {'latitude': 71.4, 'longitude': 67.633, 'title': 'Cape Kharasovoy'}, {'latitude': 71.483, 'longitude': 71.817, 'title': 'Tambey'}, {'latitude': 70.45, 'longitude': 59.067, 'title': 'Cape Bolvanskij'}, {'latitude': 70.167, 'longitude': 72.517, 'title': 'Sejaha'}, {'latitude': 69.2, 'longitude': 35.117, 'title': 'Teriberka'}, {'latitude': 68.6, 'longitude': 31.85, 'title': 'Padun'}, {'latitude': 68.967, 'longitude': 33.05, 'title': 'Murmansk'}, {'latitude': 68.0, 'longitude': 35.033, 'title': 'Lovozero'}, {'latitude': 67.15, 'longitude': 32.35, 'title': 'Kandalaksa'}, {'latitude': 67.35, 'longitude': 37.05, 'title': 'Krasnoscele'}, {'latitude': 67.15, 'longitude': 43.9, 'title': 'Mys Konusin'}, {'latitude': 67.883, 'longitude': 44.133, 'title': 'Sojna'}, {'latitude': 67.8, 'longitude': 46.667, 'title': 'Mys Mikulkin'}, {'latitude': 67.683, 'longitude': 48.683, 'title': 'Indiga'}, {'latitude': 66.683, 'longitude': 34.35, 'title': 'Umba'}, {'latitude': 66.183, 'longitude': 39.533, 'title': 'Pjalica'}, {'latitude': 66.383, 'longitude': 43.25, 'title': 'Abramovskij Majak'}, {'latitude': 65.883, 'longitude': 31.833, 'title': 'Kestenga'}, {'latitude': 65.217, 'longitude': 31.167, 'title': 'Kalevala'}, {'latitude': 65.9, 'longitude': 34.767, 'title': 'Gridino'}, {'latitude': 65.2, 'longitude': 36.817, 'title': 'Zizgin'}, {'latitude': 65.867, 'longitude': 44.217, 'title': 'Mezen'}, {'latitude': 64.95, 'longitude': 34.65, 'title': 'Kem'}, {'latitude': 64.55, 'longitude': 40.583, 'title': 'Arhangelsk'}, {'latitude': 64.7, 'longitude': 43.383, 'title': 'Pinega'}, {'latitude': 64.75, 'longitude': 47.65, 'title': 'Kojnas'}, {'latitude': 63.833, 'longitude': 30.817, 'title': 'Reboly'}, {'latitude': 63.767, 'longitude': 34.283, 'title': 'Segeza'}, {'latitude': 63.9, 'longitude': 38.117, 'title': 'Onega'}, {'latitude': 63.583, 'longitude': 45.633, 'title': 'Sura'}, {'latitude': 63.45, 'longitude': 48.9, 'title': 'Koslan'}, {'latitude': 62.917, 'longitude': 34.433, 'title': 'Medvezegorsk'}, {'latitude': 62.1, 'longitude': 42.9, 'title': 'Senkursk'}, {'latitude': 62.233, 'longitude': 45.017, 'title': 'Verhnjaja Tojma'}, {'latitude': 62.167, 'longitude': 49.117, 'title': 'Jarensk'}, {'latitude': 61.717, 'longitude': 30.717, 'title': 'Sortavala'}, {'latitude': 61.817, 'longitude': 34.267, 'title': 'Petrozavodsk'}, {'latitude': 61.017, 'longitude': 36.45, 'title': 'Vytegra'}, {'latitude': 61.5, 'longitude': 38.933, 'title': 'Kargopol'}, {'latitude': 61.667, 'longitude': 40.183, 'title': 'Njandoma'}, {'latitude': 61.083, 'longitude': 42.067, 'title': 'Velsk'}, {'latitude': 61.233, 'longitude': 46.717, 'title': 'Kotlas'}, {'latitude': 60.717, 'longitude': 28.733, 'title': 'Vyborg'}, {'latitude': 60.033, 'longitude': 37.783, 'title': 'Belozersk'}, {'latitude': 60.467, 'longitude': 40.2, 'title': 'Vozega'}, {'latitude': 60.367, 'longitude': 49.65, 'title': 'Objacevo'}, {'latitude': 69.75, 'longitude': 61.7, 'title': 'Amderma'}, {'latitude': 69.483, 'longitude': 60.333, 'title': 'Cape Bely'}, {'latitude': 69.25, 'longitude': 64.983, 'title': 'Ust-Kara'}, {'latitude': 69.717, 'longitude': 66.8, 'title': 'Maresale'}, {'latitude': 67.633, 'longitude': 53.033, 'title': 'Narjan-Mar'}, {'latitude': 67.083, 'longitude': 59.383, 'title': 'Hoseda-Hard'}, {'latitude': 66.583, 'longitude': 66.6, 'title': 'Salekhard'}, {'latitude': 57.183, 'longitude': 65.316, 'title': 'Roschino'}, {'latitude': 63.55, 'longitude': 53.817, 'title': 'Ukhta'}, {'latitude': 67.483, 'longitude': 64.016, 'title': 'Vorkuta'}, {'latitude': 67.683, 'longitude': 72.867, 'title': 'Novy Port'}, {'latitude': 66.533, 'longitude': 66.667, 'title': 'Salehard'}, {'latitude': 66.9, 'longitude': 65.667, 'title': 'Ra-Iz'}, {'latitude': 66.8, 'longitude': 68.883, 'title': 'Jambur'}, {'latitude': 66.05, 'longitude': 68.683, 'title': 'Jangi-Jugan'}, {'latitude': 66.833, 'longitude': 70.833, 'title': 'Jar-Sale'}, {'latitude': 66.6, 'longitude': 72.9, 'title': 'Nyda'}, {'latitude': 65.433, 'longitude': 52.267, 'title': 'Ust-Cilma'}, {'latitude': 65.967, 'longitude': 56.917, 'title': 'Ust-Usa'}, {'latitude': 65.117, 'longitude': 57.1, 'title': 'Pechora'}, {'latitude': 65.382, 'longitude': 64.717, 'title': 'Muzi'}, {'latitude': 65.467, 'longitude': 72.667, 'title': 'Nadym'}, {'latitude': 64.283, 'longitude': 60.883, 'title': 'Saran-Paul'}, {'latitude': 63.55, 'longitude': 53.817, 'title': 'Uhta'}, {'latitude': 63.2, 'longitude': 64.483, 'title': 'Igrim'}, {'latitude': 63.933, 'longitude': 65.05, 'title': 'Berezovo'}, {'latitude': 63.717, 'longitude': 66.7, 'title': 'Kislor West'}, {'latitude': 62.983, 'longitude': 50.9, 'title': 'Vesljana'}, {'latitude': 62.7, 'longitude': 56.2, 'title': 'Troicko-Pecherskoe'}, {'latitude': 62.433, 'longitude': 60.867, 'title': 'Njaksimvol'}, {'latitude': 62.45, 'longitude': 66.05, 'title': 'Oktjabrskoe'}, {'latitude': 61.683, 'longitude': 53.683, 'title': 'Ust-Kulom'}, {'latitude': 61.683, 'longitude': 50.783, 'title': 'Syktyvkar'}, {'latitude': 61.317, 'longitude': 71.267, 'title': 'Sitomino'}, {'latitude': 60.283, 'longitude': 54.35, 'title': 'Gajny'}, {'latitude': 60.4, 'longitude': 56.517, 'title': 'Cherdyn'}, {'latitude': 60.683, 'longitude': 60.45, 'title': 'Ivdel'}, {'latitude': 60.317, 'longitude': 64.217, 'title': 'Saim'}, {'latitude': 61.017, 'longitude': 69.033, 'title': 'Hanty-Mansijsk'}, {'latitude': 68.9, 'longitude': -179.367, 'title': 'Mys Shmidta'}, {'latitude': 67.833, 'longitude': -175.833, 'title': 'Mys Vankarem'}, {'latitude': 67.033, 'longitude': -178.917, 'title': 'Amgujema'}, {'latitude': 66.35, 'longitude': -179.117, 'title': 'Egvekinot'}, {'latitude': 66.167, 'longitude': -169.833, 'title': 'Mys Uelen'}, {'latitude': 65.55, 'longitude': -171.033, 'title': 'Lavrentija'}, {'latitude': 64.417, 'longitude': -173.233, 'title': 'Buhta Providenja'}, {'latitude': 59.467, 'longitude': 24.817, 'title': 'Tallinn'}, {'latitude': 59.517, 'longitude': 26.533, 'title': 'Kunda'}, {'latitude': 59.367, 'longitude': 28.117, 'title': 'Narva'}, {'latitude': 59.367, 'longitude': 28.6, 'title': 'Kingisepp'}, {'latitude': 59.967, 'longitude': 30.3, 'title': 'St.Petersburg'}, {'latitude': 59.35, 'longitude': 31.233, 'title': 'Ljuban'}, {'latitude': 59.65, 'longitude': 33.55, 'title': 'Tihvin'}, {'latitude': 53.883, 'longitude': 28.033, 'title': 'Minsk 2'}, {'latitude': 58.817, 'longitude': 25.417, 'title': 'Turi'}, {'latitude': 59.133, 'longitude': 26.233, 'title': 'Valke-Maarja'}, {'latitude': 58.567, 'longitude': 29.8, 'title': 'Nikolaevskoe'}, {'latitude': 58.233, 'longitude': 22.5, 'title': 'Kuressaare'}, {'latitude': 57.867, 'longitude': 24.367, 'title': 'Ainazi'}, {'latitude': 58.367, 'longitude': 24.5, 'title': 'Pjarnu'}, {'latitude': 58.3, 'longitude': 26.733, 'title': 'Tartu'}, {'latitude': 57.783, 'longitude': 26.033, 'title': 'Valga'}, {'latitude': 57.817, 'longitude': 28.417, 'title': 'Pskov'}, {'latitude': 58.017, 'longitude': 31.317, 'title': 'Staraja Russa'}, {'latitude': 57.967, 'longitude': 33.233, 'title': 'Valdaj'}, {'latitude': 57.9, 'longitude': 34.05, 'title': 'Bologoe'}, {'latitude': 57.75, 'longitude': 22.6, 'title': 'Kolka'}, {'latitude': 57.4, 'longitude': 21.533, 'title': 'Ventspils'}, {'latitude': 57.35, 'longitude': 23.117, 'title': 'Mersrags'}, {'latitude': 57.433, 'longitude': 27.033, 'title': 'Aluksne'}, {'latitude': 57.133, 'longitude': 26.717, 'title': 'Gulbene'}, {'latitude': 57.017, 'longitude': 28.9, 'title': 'Puskinskie Gory'}, {'latitude': 57.15, 'longitude': 31.183, 'title': 'Holm'}, {'latitude': 57.133, 'longitude': 33.117, 'title': 'Ostaskov'}, {'latitude': 57.35, 'longitude': 21.533, 'title': 'Ventspils'}, {'latitude': 56.483, 'longitude': 21.017, 'title': 'Liepaja'}, {'latitude': 56.683, 'longitude': 22.5, 'title': 'Saldus'}, {'latitude': 56.967, 'longitude': 24.05, 'title': 'Riga'}, {'latitude': 56.917, 'longitude': 23.967, 'title': 'Riga'}, {'latitude': 56.533, 'longitude': 27.267, 'title': 'Rezekne'}, {'latitude': 56.35, 'longitude': 30.617, 'title': 'Velikie Luki'}, {'latitude': 56.267, 'longitude': 34.317, 'title': 'Rzev'}, {'latitude': 56.5, 'longitude': 34.933, 'title': 'Staritsa'}, {'latitude': 55.967, 'longitude': 21.1, 'title': 'Palanga'}, {'latitude': 55.883, 'longitude': 23.383, 'title': 'Siauliai Intl'}, {'latitude': 55.733, 'longitude': 21.067, 'title': 'Klaipeda'}, {'latitude': 55.617, 'longitude': 22.233, 'title': 'Laukuva'}, {'latitude': 55.933, 'longitude': 23.317, 'title': 'Siauliai'}, {'latitude': 55.75, 'longitude': 24.383, 'title': 'Panevezys'}, {'latitude': 56.2, 'longitude': 24.767, 'title': 'Birzai'}, {'latitude': 55.867, 'longitude': 26.617, 'title': 'Daugavpils'}, {'latitude': 55.817, 'longitude': 27.95, 'title': 'Verhnedvinsk'}, {'latitude': 55.85, 'longitude': 32.95, 'title': 'Belyj'}, {'latitude': 55.35, 'longitude': 21.467, 'title': 'Silute'}, {'latitude': 55.383, 'longitude': 23.117, 'title': 'Raseiniai'}, {'latitude': 54.883, 'longitude': 23.833, 'title': 'Kaunas'}, {'latitude': 54.967, 'longitude': 24.083, 'title': 'Kaunas Intl'}, {'latitude': 55.533, 'longitude': 25.6, 'title': 'Utena'}, {'latitude': 55.05, 'longitude': 26.317, 'title': 'Lyntupy'}, {'latitude': 54.883, 'longitude': 28.7, 'title': 'Lepel'}, {'latitude': 55.167, 'longitude': 30.217, 'title': 'Vitebsk'}, {'latitude': 55.167, 'longitude': 34.4, 'title': 'Vjazma'}, {'latitude': 54.717, 'longitude': 20.55, 'title': 'Kaliningrad'}, {'latitude': 54.633, 'longitude': 22.783, 'title': 'Kybartai'}, {'latitude': 54.633, 'longitude': 25.283, 'title': 'Vilnius'}, {'latitude': 54.25, 'longitude': 24.55, 'title': 'Varena'}, {'latitude': 54.5, 'longitude': 30.417, 'title': 'Orsha'}, {'latitude': 54.75, 'longitude': 32.067, 'title': 'Smolensk'}, {'latitude': 53.6, 'longitude': 24.05, 'title': 'Grodno'}, {'latitude': 53.85, 'longitude': 25.317, 'title': 'Lida'}, {'latitude': 53.933, 'longitude': 27.633, 'title': 'Minsk'}, {'latitude': 53.95, 'longitude': 30.067, 'title': 'Mogilev'}, {'latitude': 53.933, 'longitude': 32.833, 'title': 'Roslavl'}, {'latitude': 53.35, 'longitude': 32.067, 'title': 'Kostuckovichi'}, {'latitude': 53.25, 'longitude': 34.317, 'title': 'Brjansk'}, {'latitude': 53.117, 'longitude': 26.0, 'title': 'Baranovichi'}, {'latitude': 53.033, 'longitude': 27.55, 'title': 'Slutsk'}, {'latitude': 53.217, 'longitude': 29.183, 'title': 'Bobruisk'}, {'latitude': 52.583, 'longitude': 33.767, 'title': 'Trubcevsk'}, {'latitude': 59.4, 'longitude': 35.933, 'title': 'Babaevo'}, {'latitude': 59.317, 'longitude': 39.917, 'title': 'Vologda'}, {'latitude': 59.883, 'longitude': 42.75, 'title': 'Tot`Ma'}, {'latitude': 59.533, 'longitude': 45.467, 'title': 'Nikol`Sk'}, {'latitude': 59.85, 'longitude': 48.283, 'title': 'Oparino'}, {'latitude': 59.25, 'longitude': 37.967, 'title': 'Cerepovec'}, {'latitude': 58.6, 'longitude': 49.633, 'title': 'Kirov'}, {'latitude': 57.8, 'longitude': 35.883, 'title': 'Maksatikha'}, {'latitude': 57.8, 'longitude': 36.7, 'title': 'Bezeck'}, {'latitude': 58.1, 'longitude': 38.683, 'title': 'Rybinsk'}, {'latitude': 58.483, 'longitude': 41.533, 'title': 'Buj'}, {'latitude': 58.35, 'longitude': 43.383, 'title': 'Nikolo-Poloma'}, {'latitude': 58.367, 'longitude': 45.533, 'title': 'Sar`Ja'}, {'latitude': 57.2, 'longitude': 39.417, 'title': 'Rostov'}, {'latitude': 57.333, 'longitude': 43.117, 'title': 'Jur`Evec'}, {'latitude': 57.133, 'longitude': 45.167, 'title': 'Krasnye Baki'}, {'latitude': 57.667, 'longitude': 46.633, 'title': 'Sakun`Ja'}, {'latitude': 57.55, 'longitude': 49.95, 'title': 'Nolinsk'}, {'latitude': 56.9, 'longitude': 35.883, 'title': 'Tver'}, {'latitude': 56.267, 'longitude': 44.0, 'title': 'Niznij Novgorod'}, {'latitude': 56.333, 'longitude': 46.583, 'title': 'Koz`Modem`Jansk'}, {'latitude': 55.967, 'longitude': 37.417, 'title': 'Sheremetyevo'}, {'latitude': 55.583, 'longitude': 37.25, 'title': 'Vnukovo'}, {'latitude': 56.117, 'longitude': 40.35, 'title': 'Vladimir'}, {'latitude': 55.6, 'longitude': 49.283, 'title': 'Kazan`'}, {'latitude': 55.567, 'longitude': 52.083, 'title': 'Begishevo'}, {'latitude': 55.833, 'longitude': 37.617, 'title': 'Moskva'}, {'latitude': 54.95, 'longitude': 41.767, 'title': 'Elat`Ma'}, {'latitude': 55.033, 'longitude': 44.5, 'title': 'Lukojanov'}, {'latitude': 54.817, 'longitude': 46.583, 'title': 'Alatyr`'}, {'latitude': 54.567, 'longitude': 36.4, 'title': 'Kaluga'}, {'latitude': 54.1, 'longitude': 35.583, 'title': 'Suhinici'}, {'latitude': 54.233, 'longitude': 37.617, 'title': 'Tula'}, {'latitude': 54.633, 'longitude': 39.7, 'title': 'Rjazan`'}, {'latitude': 54.317, 'longitude': 48.333, 'title': 'Ulyanovsk'}, {'latitude': 53.783, 'longitude': 39.25, 'title': 'Pavelec'}, {'latitude': 53.717, 'longitude': 40.117, 'title': 'Rjazsk'}, {'latitude': 53.483, 'longitude': 42.633, 'title': 'Zametcino'}, {'latitude': 52.933, 'longitude': 36.0, 'title': 'Orel'}, {'latitude': 52.633, 'longitude': 38.517, 'title': 'Elec'}, {'latitude': 52.8, 'longitude': 41.333, 'title': 'Tambov'}, {'latitude': 53.117, 'longitude': 45.017, 'title': 'Penza'}, {'latitude': 53.183, 'longitude': 48.4, 'title': 'Syzran`'}, {'latitude': 59.367, 'longitude': 52.217, 'title': 'Kirs'}, {'latitude': 59.6, 'longitude': 60.533, 'title': 'Serov'}, {'latitude': 59.433, 'longitude': 62.333, 'title': 'Gari'}, {'latitude': 59.617, 'longitude': 65.717, 'title': 'Leusi'}, {'latitude': 59.667, 'longitude': 67.417, 'title': 'Kondinskoje'}, {'latitude': 59.6, 'longitude': 69.283, 'title': 'Demjanskoe'}, {'latitude': 59.467, 'longitude': 73.367, 'title': 'Usanovy'}, {'latitude': 58.983, 'longitude': 54.65, 'title': 'Kudymkar'}, {'latitude': 59.033, 'longitude': 57.567, 'title': 'Kizel'}, {'latitude': 58.867, 'longitude': 60.783, 'title': 'Verhotur`E'}, {'latitude': 58.133, 'longitude': 52.583, 'title': 'Glazov'}, {'latitude': 58.083, 'longitude': 54.683, 'title': 'Verescagino'}, {'latitude': 58.017, 'longitude': 56.3, 'title': 'Perm'}, {'latitude': 57.95, 'longitude': 56.2, 'title': 'Perm'}, {'latitude': 57.883, 'longitude': 60.067, 'title': 'Nizhnyj Tagil'}, {'latitude': 58.05, 'longitude': 63.683, 'title': 'Turinsk'}, {'latitude': 58.15, 'longitude': 68.25, 'title': 'Tobolsk'}, {'latitude': 57.917, 'longitude': 69.033, 'title': 'Vagay River'}, {'latitude': 57.083, 'longitude': 54.75, 'title': 'Nozovka'}, {'latitude': 57.717, 'longitude': 55.383, 'title': 'Ohansk'}, {'latitude': 57.35, 'longitude': 58.217, 'title': 'Samary'}, {'latitude': 57.433, 'longitude': 67.083, 'title': 'Jarkovo'}, {'latitude': 57.117, 'longitude': 65.433, 'title': 'Tjumen'}, {'latitude': 57.717, 'longitude': 57.683, 'title': 'Ust-Isim'}, {'latitude': 57.517, 'longitude': 72.4, 'title': 'Tevriz'}, {'latitude': 56.833, 'longitude': 53.45, 'title': 'Izhevsk'}, {'latitude': 56.267, 'longitude': 54.9, 'title': 'Janaul'}, {'latitude': 56.5, 'longitude': 56.133, 'title': 'Cernuska'}, {'latitude': 56.65, 'longitude': 57.783, 'title': 'Krasnoufimsk'}, {'latitude': 56.833, 'longitude': 60.633, 'title': 'Ekaterinburg'}, {'latitude': 56.85, 'longitude': 62.717, 'title': 'Kamyslov'}, {'latitude': 56.683, 'longitude': 66.35, 'title': 'Jalturovosk'}, {'latitude': 56.817, 'longitude': 70.617, 'title': 'Vikulovo'}, {'latitude': 56.933, 'longitude': 72.667, 'title': 'Bol`Sie-Uki'}, {'latitude': 55.767, 'longitude': 52.067, 'title': 'Elabuga'}, {'latitude': 56.083, 'longitude': 56.583, 'title': 'Askino'}, {'latitude': 55.7, 'longitude': 57.9, 'title': 'Duvan'}, {'latitude': 56.083, 'longitude': 60.3, 'title': 'Verhnij Ufalej'}, {'latitude': 56.067, 'longitude': 63.65, 'title': 'Sadrinsk'}, {'latitude': 56.1, 'longitude': 69.433, 'title': 'Isim'}, {'latitude': 55.867, 'longitude': 72.2, 'title': 'Tjukalinsk'}, {'latitude': 55.567, 'longitude': 71.367, 'title': 'Nazyvoevsk'}, {'latitude': 55.183, 'longitude': 53.8, 'title': 'Bakaly'}, {'latitude': 55.417, 'longitude': 55.533, 'title': 'Birsk'}, {'latitude': 55.0, 'longitude': 57.983, 'title': 'Kropacevo'}, {'latitude': 55.3, 'longitude': 61.533, 'title': 'Cheljabinsk-Balandi'}, {'latitude': 55.233, 'longitude': 63.317, 'title': 'Sumiha'}, {'latitude': 55.467, 'longitude': 65.4, 'title': 'Kurgan'}, {'latitude': 55.25, 'longitude': 67.3, 'title': 'Makusino'}, {'latitude': 54.9, 'longitude': 71.25, 'title': 'Isilkul'}, {'latitude': 55.017, 'longitude': 73.383, 'title': 'Omsk'}, {'latitude': 54.583, 'longitude': 52.8, 'title': 'Bugulma'}, {'latitude': 54.717, 'longitude': 55.833, 'title': 'Ufa'}, {'latitude': 54.083, 'longitude': 61.617, 'title': 'Troizk'}, {'latitude': 54.467, 'longitude': 64.867, 'title': 'Zverinogolovskaja'}, {'latitude': 54.367, 'longitude': 71.75, 'title': 'Poltavka'}, {'latitude': 54.633, 'longitude': 72.433, 'title': 'Serbakul'}, {'latitude': 54.2, 'longitude': 72.967, 'title': 'Odesskoe'}, {'latitude': 53.25, 'longitude': 50.45, 'title': 'Samara (Snysljaevka'}, {'latitude': 53.583, 'longitude': 56.0, 'title': 'Sterlitamak'}, {'latitude': 53.35, 'longitude': 59.083, 'title': 'Magnitogorsk'}, {'latitude': 53.25, 'longitude': 50.45, 'title': 'Samara'}, {'latitude': 52.817, 'longitude': 52.217, 'title': 'Buzuluk'}, {'latitude': 52.95, 'longitude': 55.967, 'title': 'Meleuz'}, {'latitude': 48.417, 'longitude': 39.367, 'title': 'Luhansk'}, {'latitude': 48.067, 'longitude': 37.733, 'title': 'Donetsk'}, {'latitude': 48.033, 'longitude': 33.2, 'title': 'Lozuvatka'}, {'latitude': 48.533, 'longitude': 34.667, 'title': 'Dnipropetrovsk'}, {'latitude': 52.117, 'longitude': 23.683, 'title': 'Brest'}, {'latitude': 52.117, 'longitude': 26.117, 'title': 'Pinsk'}, {'latitude': 52.217, 'longitude': 27.867, 'title': 'Zhitckovichi'}, {'latitude': 51.95, 'longitude': 29.167, 'title': 'Mozyr'}, {'latitude': 52.4, 'longitude': 30.95, 'title': 'Gomel'}, {'latitude': 52.183, 'longitude': 32.583, 'title': 'Semenovka'}, {'latitude': 51.283, 'longitude': 26.617, 'title': 'Sarny'}, {'latitude': 51.467, 'longitude': 31.25, 'title': 'Chernihiv'}, {'latitude': 50.833, 'longitude': 24.317, 'title': 'Volodymyr-Volynskyi'}, {'latitude': 51.05, 'longitude': 31.9, 'title': 'Nizhyn'}, {'latitude': 51.233, 'longitude': 33.2, 'title': 'Konotop'}, {'latitude': 50.85, 'longitude': 34.667, 'title': 'Sumy'}, {'latitude': 50.583, 'longitude': 26.133, 'title': 'Rivne'}, {'latitude': 48.633, 'longitude': 22.267, 'title': 'Uzhhorod'}, {'latitude': 47.05, 'longitude': 31.917, 'title': 'Mykolaiv'}, {'latitude': 50.167, 'longitude': 27.033, 'title': 'Shepetivka'}, {'latitude': 50.233, 'longitude': 28.733, 'title': 'Zhytomyr'}, {'latitude': 50.4, 'longitude': 30.567, 'title': 'Kyiv'}, {'latitude': 50.6, 'longitude': 30.2, 'title': 'Hostomel'}, {'latitude': 50.35, 'longitude': 30.917, 'title': 'Kiev/Borispol'}, {'latitude': 50.333, 'longitude': 30.967, 'title': 'Boryspil'}, {'latitude': 50.217, 'longitude': 31.8, 'title': 'Yahotyn'}, {'latitude': 50.0, 'longitude': 33.017, 'title': 'Lubny'}, {'latitude': 49.817, 'longitude': 23.95, 'title': 'Lviv'}, {'latitude': 48.25, 'longitude': 25.983, 'title': 'Chernivtsi'}, {'latitude': 49.533, 'longitude': 25.667, 'title': 'Ternopil'}, {'latitude': 49.433, 'longitude': 26.983, 'title': 'Khmelnytskyi'}, {'latitude': 49.667, 'longitude': 31.0, 'title': 'Myronivka'}, {'latitude': 49.6, 'longitude': 34.55, 'title': 'Poltava'}, {'latitude': 48.967, 'longitude': 24.7, 'title': 'Ivano-Frankivsk'}, {'latitude': 49.233, 'longitude': 28.6, 'title': 'Vinnytsia'}, {'latitude': 48.767, 'longitude': 30.233, 'title': 'Uman'}, {'latitude': 49.05, 'longitude': 33.25, 'title': 'Svitlovodsk'}, {'latitude': 49.033, 'longitude': 33.433, 'title': 'Kremencug'}, {'latitude': 49.15, 'longitude': 34.2, 'title': 'Kobeliaky'}, {'latitude': 48.633, 'longitude': 22.267, 'title': 'Uzhhorod'}, {'latitude': 48.45, 'longitude': 27.783, 'title': 'Mohyliv-Podilskyi'}, {'latitude': 48.517, 'longitude': 32.2, 'title': 'Kirovohrad'}, {'latitude': 47.85, 'longitude': 30.267, 'title': 'Liubashivka'}, {'latitude': 47.567, 'longitude': 31.333, 'title': 'Voznesensk'}, {'latitude': 48.033, 'longitude': 33.217, 'title': 'Kryvyi Rih'}, {'latitude': 46.433, 'longitude': 30.767, 'title': 'Odesa'}, {'latitude': 46.783, 'longitude': 33.367, 'title': 'Nova Kakhovka'}, {'latitude': 45.367, 'longitude': 28.85, 'title': 'Izmail'}, {'latitude': 46.633, 'longitude': 32.567, 'title': 'Kherson'}, {'latitude': 46.167, 'longitude': 34.817, 'title': 'Henichesk'}, {'latitude': 45.517, 'longitude': 32.7, 'title': 'Chornomorske'}, {'latitude': 44.683, 'longitude': 34.133, 'title': 'Simferopol'}, {'latitude': 45.033, 'longitude': 35.383, 'title': 'Feodosiia'}, {'latitude': 44.483, 'longitude': 34.167, 'title': 'Yalta'}, {'latitude': 51.767, 'longitude': 36.167, 'title': 'Kursk'}, {'latitude': 51.833, 'longitude': 41.483, 'title': 'Zerdevka'}, {'latitude': 51.3, 'longitude': 37.883, 'title': 'Staryj Oskol'}, {'latitude': 51.65, 'longitude': 39.25, 'title': 'Voronez'}, {'latitude': 51.7, 'longitude': 39.217, 'title': 'Voronez'}, {'latitude': 51.55, 'longitude': 43.15, 'title': 'Balasov'}, {'latitude': 51.567, 'longitude': 46.033, 'title': 'Saratov'}, {'latitude': 51.367, 'longitude': 48.3, 'title': 'Ersov'}, {'latitude': 50.8, 'longitude': 42.0, 'title': 'Urjupinsk'}, {'latitude': 50.417, 'longitude': 41.05, 'title': 'Kalac'}, {'latitude': 50.833, 'longitude': 44.567, 'title': 'Rudnya'}, {'latitude': 49.967, 'longitude': 36.133, 'title': 'Kharkiv'}, {'latitude': 50.2, 'longitude': 35.533, 'title': 'Bohodukhiv'}, {'latitude': 50.217, 'longitude': 38.1, 'title': 'Valujki'}, {'latitude': 49.933, 'longitude': 40.567, 'title': 'Bogucar'}, {'latitude': 49.567, 'longitude': 42.75, 'title': 'Serafimovic'}, {'latitude': 50.067, 'longitude': 45.367, 'title': 'Kamysin'}, {'latitude': 50.15, 'longitude': 48.55, 'title': 'Aleksandrov-Gaj'}, {'latitude': 49.183, 'longitude': 37.3, 'title': 'Izium'}, {'latitude': 48.6, 'longitude': 34.967, 'title': 'Dnipropetrovsk'}, {'latitude': 48.067, 'longitude': 37.767, 'title': 'Donetsk'}, {'latitude': 48.567, 'longitude': 39.25, 'title': 'Luhansk'}, {'latitude': 48.35, 'longitude': 41.867, 'title': 'Morozovsk'}, {'latitude': 48.783, 'longitude': 44.367, 'title': 'Volgograd'}, {'latitude': 48.217, 'longitude': 46.733, 'title': 'Verhnij Baskuncak'}, {'latitude': 47.8, 'longitude': 35.017, 'title': 'Zaporizhzhia'}, {'latitude': 47.267, 'longitude': 35.333, 'title': 'Pryshyb'}, {'latitude': 47.333, 'longitude': 36.333, 'title': 'Kyrylivka'}, {'latitude': 47.633, 'longitude': 43.15, 'title': 'Kotel`Nikovo'}, {'latitude': 47.033, 'longitude': 37.5, 'title': 'Mariupol'}, {'latitude': 46.75, 'longitude': 36.783, 'title': 'Berdyansk'}, {'latitude': 47.267, 'longitude': 39.817, 'title': 'Rostov-Na-Donu'}, {'latitude': 47.25, 'longitude': 39.817, 'title': 'Rostov-Na-Donu'}, {'latitude': 46.55, 'longitude': 41.05, 'title': 'Celina'}, {'latitude': 46.567, 'longitude': 43.667, 'title': 'Remontnoe'}, {'latitude': 46.033, 'longitude': 38.15, 'title': 'Primorsko-Ahtarsk'}, {'latitude': 45.85, 'longitude': 40.083, 'title': 'Tihoreck'}, {'latitude': 45.917, 'longitude': 43.35, 'title': 'Divnoe'}, {'latitude': 46.367, 'longitude': 44.333, 'title': 'Elista'}, {'latitude': 46.183, 'longitude': 45.35, 'title': 'Jaskul'}, {'latitude': 46.283, 'longitude': 48.05, 'title': 'Astrahan'}, {'latitude': 45.033, 'longitude': 39.15, 'title': 'Krasnodar'}, {'latitude': 45.117, 'longitude': 42.083, 'title': 'Stavropol'}, {'latitude': 45.35, 'longitude': 42.85, 'title': 'Svetlograd'}, {'latitude': 52.217, 'longitude': 57.4, 'title': 'Zilair'}, {'latitude': 51.867, 'longitude': 58.183, 'title': 'Akjar'}, {'latitude': 51.683, 'longitude': 55.1, 'title': 'Orenburg'}, {'latitude': 46.283, 'longitude': 48.0, 'title': 'Astrakhan'}, {'latitude': 55.4, 'longitude': 37.9, 'title': 'Domodedovo'}, {'latitude': 44.883, 'longitude': 37.283, 'title': 'Anapa'}, {'latitude': 44.1, 'longitude': 39.067, 'title': 'Tuapse'}, {'latitude': 44.983, 'longitude': 41.117, 'title': 'Armavir'}, {'latitude': 44.233, 'longitude': 43.067, 'title': 'Mineralnye Vody'}, {'latitude': 44.783, 'longitude': 44.133, 'title': 'Budennovsk'}, {'latitude': 44.4, 'longitude': 46.55, 'title': 'Kocubej'}, {'latitude': 43.733, 'longitude': 44.667, 'title': 'Mozdok'}, {'latitude': 43.433, 'longitude': 39.9, 'title': 'Adler'}, {'latitude': 43.533, 'longitude': 43.633, 'title': 'Nalcik'}, {'latitude': 43.05, 'longitude': 44.65, 'title': 'Wladikavkaz'}, {'latitude': 43.35, 'longitude': 45.683, 'title': 'Groznyj'}, {'latitude': 43.017, 'longitude': 47.483, 'title': 'Mahackala'}, {'latitude': 44.65, 'longitude': 40.1, 'title': 'Maykop'}, {'latitude': 42.817, 'longitude': 47.65, 'title': 'Uytash'}, {'latitude': 51.067, 'longitude': 58.6, 'title': 'Orsk'}, {'latitude': 47.783, 'longitude': 27.95, 'title': 'Bel `Cy'}, {'latitude': 47.017, 'longitude': 28.983, 'title': 'Kisinev'}, {'latitude': 46.3, 'longitude': 28.633, 'title': 'Komrat'}]


