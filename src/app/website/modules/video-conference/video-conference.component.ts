import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CustomCookieService } from '../../core/service/cookie.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-conference',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-conference.component.html',
  styleUrls: ['./video-conference.component.scss'],
})
export class VideoConferenceComponent implements OnInit, AfterViewInit {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  private token = this.cookieService.getCookie('token');
  private socket!: Socket;
  private peerConnection!: RTCPeerConnection;
  private localStream!: MediaStream;

  public isMicrophoneOn: boolean = true;
  public isVideoOn: boolean = true;

  constructor(private cookieService: CustomCookieService) {}

  ngOnInit(): void {
    this.socket = io('http://localhost:5000/api', {
      extraHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
      transports: ['websocket'],
    });
  }

  ngAfterViewInit(): void {
    this.initWebRTC();
  }

  private initWebRTC(): void {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('getUserMedia is not supported in this browser.');
      return;
    }

    const iceServers = [
      { urls: 'stun:stun.l.google.com:19302' }, // STUN сервер
    ];

    this.peerConnection = new RTCPeerConnection({
      iceServers: iceServers,
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('candidate', event.candidate);
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.localStream = stream;
        this.localVideo.nativeElement.srcObject = stream;
        stream.getTracks().forEach((track) => {
          this.peerConnection.addTrack(track, stream);
        });

        this.peerConnection
          .createOffer()
          .then((offer) => {
            return this.peerConnection.setLocalDescription(offer);
          })
          .then(() => {
            this.socket.emit('offer', this.peerConnection.localDescription);
          });
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });

    this.socket.on('offer', (offer: RTCSessionDescriptionInit) => {
      this.peerConnection
        .setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => {
          return this.peerConnection.createAnswer();
        })
        .then((answer) => {
          return this.peerConnection.setLocalDescription(answer);
        })
        .then(() => {
          this.socket.emit('answer', this.peerConnection.localDescription);
        })
        .catch((error) => {
          console.error('Error handling offer.', error);
        });
    });

    this.socket.on('answer', (answer: RTCSessionDescriptionInit) => {
      this.peerConnection
        .setRemoteDescription(new RTCSessionDescription(answer))
        .catch((error) => {
          console.error('Error handling answer.', error);
        });
    });

    this.socket.on('candidate', (candidate: RTCIceCandidateInit) => {
      this.peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((error) => {
          console.error('Error adding candidate.', error);
        });
    });
  }

  toggleMicrophone(): void {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        this.isMicrophoneOn = audioTrack.enabled;
      }
    }
  }

  toggleVideo(): void {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        this.isVideoOn = videoTrack.enabled;
      }
    }
  }
}
