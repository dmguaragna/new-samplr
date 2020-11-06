// const sampler = new Tone.Sampler( {
//         A1: "https://tonejs.github.io/audio/berklee/gong_1.mp3",
//
//         },
//         baseUrl: "https://tonejs.github.io/audio/berklee/gong_1.mp3",
//         onload: () => {
//         sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
//         }
// // }).toDestination();
//
// const sound = new Tone.Player("sounds/RICKYXSAN_growl_one_shot_04_E.wav").toDestination();
//   Tone.loaded().then(() => {
//   	sound.start();
//   });

const player = new Tone.Synth().toDestination();

  Tone.loaded().then(() => {
  	player.toMaster();
  });


// const player = new Tone.Synth();
// // player.oscillator.type = "sine";
// player.toMaster();

const piano = document.getElementById("piano");

piano.addEventListener("mousedown", e => {
player.triggerAttack(e.target.dataset.note);
});

piano.addEventListener("mouseup", e => {
player.triggerRelease();
});

document.addEventListener("keydown", e => {
switch (e.key) {
  case "d":
    return player.triggerAttack("C4");
  case "r":
    return player.triggerAttack("C#4");
  case "f":
    return player.triggerAttack("D4");
  case "t":
    return player.triggerAttack("D#4");
  case "g":
    return player.triggerAttack("E4");
  case "h":
    return player.triggerAttack("F4");
  case "u":
    return player.triggerAttack("F#4");
  case "j":
    return player.triggerAttack("G4");
  case "i":
    return player.triggerAttack("G#4");
  case "k":
    return player.triggerAttack("A4");
  case "o":
    return player.triggerAttack("A#4");
  case "l":
    return player.triggerAttack("B4");
  default:
    return;
}
});

document.addEventListener("keyup", e => {
switch (e.key) {
  case "d":
  case "r":
  case "f":
  case "t":
  case "g":
  case "h":
  case "u":
  case "j":
  case "i":
  case "k":
  case "o":
  case "l":
     player.triggerRelease();
}
});
