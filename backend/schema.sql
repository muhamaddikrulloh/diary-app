CREATE DATABASE IF NOT EXISTS diary_app;
USE diary_app;

CREATE TABLE IF NOT EXISTS diaries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  diary_date DATE NOT NULL,
  body TEXT NOT NULL,
  mood VARCHAR(20) DEFAULT '😊',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO diaries (title, diary_date, body, mood)
VALUES
('Pagi yang Tenang', '2026-11-23',
 'Pagi ini terasa tenang dan menyenangkan.', '😊'),
('Belajar Redux', '2026-11-22',
 'Hari ini belajar Redux Toolkit di React Native.', '🎯');