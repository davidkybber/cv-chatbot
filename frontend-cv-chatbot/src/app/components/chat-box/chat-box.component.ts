import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {
  messages: Array<{text: string, isUser: boolean}> = [];
  newMessage = '';
  isLoading = false;

  constructor(private chatService: ChatService) {
    this.chatService.loading$.subscribe(
      loading => this.isLoading = loading
    );
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const userMessage = this.newMessage;
    this.messages.push({ text: userMessage, isUser: true });
    this.newMessage = '';

    this.chatService.sendMessage(userMessage).subscribe({
      next: (response) => {
        this.messages.push({ text: response.answer, isUser: false });
      },
      error: (error) => {
        this.messages.push({ 
          text: 'Sorry, I encountered an error. Please try again.',
          isUser: false 
        });
        console.error('Error:', error);
      }
    });
  }
} 