var h;
var color = {'brick': true, 'ground':false, 'wood':false, 'stone':false, 'spawn': false};
var menu = {'EnablePhysics': false, 'static': false, 'Map_Size': 2000, 'impulse' : 100000, 'gravity' : -30, 'blockMass' : 25 };
var skymap = {'Mountains':true, 'bluefreeze':false, 'darkland':false, 'city':false, 'comawhite':false};
function setUpGui()
{
    // gui
                
    var gui = new dat.GUI();
    
    gui.add(menu, 'Map_Size').min(1000).max(10000).listen().onChange(function(value) {
        
            value = Math.round(value/2);
            value = Math.round(value/50);
            value = Math.round(value*50);
        
            updateSquareGrid(value);
        initSize = value;
    });
    
    h = gui.addFolder("Blocks");

    h.add(color, 'brick').listen().onChange(function(value) {falsifyColors('brick'); currBlockType = block.BRICK;});
    h.add(color, 'ground').listen().onChange(function(value) {falsifyColors('ground'); currBlockType = block.GROUND;});
    h.add(color, 'wood').listen().onChange(function(value) {falsifyColors('wood'); currBlockType = block.WOOD;});
    h.add(color, 'stone').listen().onChange(function(value) {falsifyColors('stone'); currBlockType = block.STONE;});
    
    var p = gui.addFolder("Physics");
    p.add(menu, 'EnablePhysics').listen();
    p.add(menu, 'gravity').min(-100).max(100).listen();
    p.add(menu, 'blockMass').min(0).max(100).listen();
    p.add(menu, 'impulse').min(0).max(1000000).listen();
    
    var s = gui.addFolder("SkyBox");
    s.add(skymap, 'Mountains').listen().onChange(function(value) {falsifyMap('Mountains'); currentPlaneMaterial = 0; loadSkyMap(); });
    s.add(skymap, 'bluefreeze').listen().onChange(function(value) {falsifyMap('bluefreeze'); currentPlaneMaterial = 1; loadSkyMap(); });
    s.add(skymap, 'darkland').listen().onChange(function(value) {falsifyMap('darkland'); currentPlaneMaterial = 0; loadSkyMap(); });
    s.add(skymap, 'city').listen().onChange(function(value) {falsifyMap('city'); currentPlaneMaterial = 2; loadSkyMap(); });
    s.add(skymap, 'comawhite').listen().onChange(function(value) {falsifyMap('comawhite'); currentPlaneMaterial = 1; loadSkyMap(); });
    
    
    h.add(menu, 'static').listen();
    
    gui.add(color, 'spawn').listen().onChange(function(value) {falsifyColors('spawn'); currBlockType = block.SPAWN;});
    
    
    
    
    //addColorPropertyToGui();

    //color.red = false;



    gui.domElement.id = 'gui';
}

function falsifyColors(mycolor)
{
    for (property in color)
    {
        if (property == mycolor)
        {
            color[property] = true;
            currBlockType = property;
            continue;
        }


        color[property] = false;
    }
}

function falsifyMap(mycolor)
{
    for (property in skymap)
    {
        if (property == mycolor)
        {
            skymap[property] = true;
            //currBlockType = property;
            continue;
        }


        skymap[property] = false;
    }
}

function addColorPropertyToGui()
{
    for (property in color)
    {
        if (color.hasOwnProperty(property) )
        {
            h.add(color, property).listen().onChange(function(value) {falsifyColors(property.toString)} );
        }
    }
}

function updateSquareGrid(size)
{
    // grid
    scene.remove(line);
    //objects.splice(objects.indexOf(line), 1);
    
    var scale = size/initSize;
    console.log(scale);
    
    var step = 50;

    var geometry = new THREE.Geometry();

    for ( var i = - size; i <= size; i += step ) {

        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

    }

    var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: false } );

    line = new THREE.LineSegments( geometry, material );
    scene.add( line );
    
    scene.remove(plane);
    objects.splice(objects.indexOf(plane), 1);
    var geometry = new THREE.PlaneBufferGeometry( size*2, size*2 );
    geometry.rotateX( - Math.PI / 2 );

    plane = new THREE.Mesh( geometry, planeMaterials[currentPlaneMaterial] );
    scene.add( plane );
    objects.push(plane);
    
    axis.position.x = -size;
    axis.position.z = -size;
    
    //objects.push(line);
}
