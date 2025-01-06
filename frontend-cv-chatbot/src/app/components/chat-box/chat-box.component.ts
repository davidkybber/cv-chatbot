import { Component, OnInit } from '@angular/core';
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
export class ChatBoxComponent implements OnInit {
  messages: Array<{text: string, isUser: boolean}> = [];
  newMessage = '';
  isLoading = false;

  constructor(private chatService: ChatService) {
    this.chatService.loading$.subscribe(
      loading => this.isLoading = loading
    );
  }

  ngOnInit() {
    // Add welcome message when component initializes
    this.messages.push({
      text: "Hello! I'm David's CV Assistant. I can help you learn about David's professional experience, skills, and projects. Feel free to ask me anything about his career and qualifications!",
      isUser: false
    });
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