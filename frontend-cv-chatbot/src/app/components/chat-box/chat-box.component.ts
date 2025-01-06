import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

interface Message {
  content: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked {
  messages: Message[] = [];
  inputMessage = '';
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.messages.push({
      content: "How may I assist you with David's CV information?",
      isUser: false
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

  async sendMessage() {
    if (!this.inputMessage.trim()) return;

    // Add user message
    this.messages.push({
      content: this.inputMessage,
      isUser: true
    });

    const messageToSend = this.inputMessage;
    this.inputMessage = '';

    try {
      this.chatService.sendMessage(messageToSend).subscribe(
        response => {
          this.messages.push({
            content: response.answer,
            isUser: false
          });
        },
        error => {
          console.error('Error:', error);
          this.messages.push({
            content: "Sorry, I couldn't process your request at the moment.",
            isUser: false
          });
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }
} 