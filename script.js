
//a table of the colors and the corresponding destinations
const lookupTable = [
    ["0000FF", "#fc"],
    ["e0203b", ""],
    ["ff7e26", "#battery"],
    ["00a4e7", "#camera"],
    ["580281", "#rx"],
    ["027d0b", "#esc"],
    ["b5e61d", "#motor"],
]


//drawing the image on a canvas and sizing it correctly
window.onload = function() {
    const canvas = document.getElementById("explimg")
    const ctx = canvas.getContext("2d")

    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height


    img = new Image()
    img.src = "img/Drone_Diagram.webp"
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

//getting the coordinates of the cursor, adjusting them to mach the coordinates of the canvas and get the color of this pixel when the canvas is clicked
    canvas.onclick = function(event) {
        const mouseX = event.x - canvas.getBoundingClientRect().left
        const mouseY = event.y - canvas.getBoundingClientRect().top
        console.log(mouseX, mouseY)
        const color = ctx.getImageData(mouseX, mouseY, 1, 1).data
        console.log(color)
//        console.log(color[0].toString(16) + color[1].toString(16) + color[2].toString(16))

//converting the hexadecimal values of the table into rgb
        lookupTable.forEach(cell => {
            const colorHEX = cell[0]
            const link = cell[1]

            const r = parseInt(colorHEX.substring(0, 2), 16)
            const g = parseInt(colorHEX.substring(2, 4), 16)
            const b = parseInt(colorHEX.substring(4, 6), 16)

            //console.log(r, g, b)

            // the numeral range of margin for the colors
            const plusMinusRange = 10

//compare the color of the clicked pixel to the colors in the list
            if (color[0] + plusMinusRange > r && color[0] - plusMinusRange < r &&
                color[1] + plusMinusRange > g && color[1] - plusMinusRange < g &&
                color[2] + plusMinusRange > b && color[2] - plusMinusRange < b) {
//              console.log("Match")
                window.location = link
            }
        })
    }
}
