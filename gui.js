var h;
var color = {'brick': true, 'ground':false, 'wood':false, 'stone':false, 'spawn': false};
function setUpGui()
{
    // gui
                
    var gui = new dat.GUI();
    h = gui.addFolder("Blocks");

    h.add(color, 'brick').listen().onChange(function(value) {falsifyColors('brick'); currBlockType = block.BRICK;});
    h.add(color, 'ground').listen().onChange(function(value) {falsifyColors('ground'); currBlockType = block.GROUND;});
    h.add(color, 'wood').listen().onChange(function(value) {falsifyColors('wood'); currBlockType = block.WOOD;});
    h.add(color, 'stone').listen().onChange(function(value) {falsifyColors('stone'); currBlockType = block.STONE;});
    
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
