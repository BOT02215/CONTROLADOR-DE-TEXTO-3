centerPosition = 0
noseX = 0
noseY = 0
rightWrist = 0
leftWrist = 0
textin_side = 0

function setup() {
    canvas = createCanvas(400, 400)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(400, 400)
    video.position(20, 200)

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function modelLoaded() {
    console.log("Modelo Carregado")
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result)
        noseX = result[0].pose.nose.x
        noseY = result[0].pose.nose.y
        rightWrist = result[0].pose.rightWrist.x
        leftWrist = result[0].pose.leftWrist.x
        textin_side = floor(leftWrist - rightWrist)
        centerPosition = textin_side*1.5
        document.getElementById("text_size").innerHTML
        console.log(noseX)
        document.getElementById("text_size").innerHTML = "Tamanho do Quadrado: " + textin_side
    }
}

function draw() {
    background("darkslategray")
    text("Textão", noseX - centerPosition, noseY)
    textSize(textin_side)
    fill("white")
}