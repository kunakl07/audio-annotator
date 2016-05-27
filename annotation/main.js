'use strict';

var wavesurfer;

function addWaveSurferEvents (wavesurfer) {
    wavesurfer.on('play', function () {
        $('.play_audio').removeClass('fa-play-circle').addClass('fa-stop-circle');
    });
    
    wavesurfer.on('pause', function () {
        $('.play_audio').removeClass('fa-stop-circle').addClass('fa-play-circle');
    }); 

    wavesurfer.on('seek', function () {
        PlayBar.updateTimer(wavesurfer);
    });

    wavesurfer.on('audioprocess', function () {
        PlayBar.updateTimer(wavesurfer);
    });

    wavesurfer.on('pause', function () {
        wavesurfer.seekTo(wavesurfer.getCurrentTime() / wavesurfer.getDuration());
    });

    wavesurfer.on('finish', function () {
        wavesurfer.seekTo(wavesurfer.getCurrentTime() / wavesurfer.getDuration());
    });
}

function main() {
    wavesurfer = Object.create(WaveSurfer);
    var height = 128;

    var spectrogramColorMap = colormap({
        colormap: 'hot',
        nshades: 256,
        format: 'rgb',
        alpha: 1    
    });

    wavesurfer.init({
        container: '#waveform',
        waveColor: '#FF00FF',
        visualization: experimentData["visualization_type"],
        fftSamples: height * 2,
        height: height,
        noverlap: 128,
        colorMap: spectrogramColorMap,
    });

    addWaveSurferEvents(wavesurfer);

    wavesurfer.on('ready', function () {
        PlayBar.createPlayBar(wavesurfer);
        AnnotationStages.createStages(wavesurfer);
    });
    
    wavesurfer.load(experimentData["url"]);
}

main();
