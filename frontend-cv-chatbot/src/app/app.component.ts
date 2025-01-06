import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatBoxComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CV Chat Assistant';
}
