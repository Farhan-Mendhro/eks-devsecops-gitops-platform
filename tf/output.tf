output "instance_id" {
  description = "Synopsis EC2 instance Id"
  value       = aws_instance.synopsis.id
}

output "public_ip" {
  description = "Synopsis EC2 public IP"
  value       = aws_instance.synopsis.public_ip
}

output "jenkins_url" {
  description = "Jenkins web server"
  value       = "http://${aws_instance.synopsis.public_ip}:8080"
}

output "sonarqube_url" {
  description = "SonarQube web server"
  value       = "http://${aws_instance.synopsis.public_ip}:9000"
}
