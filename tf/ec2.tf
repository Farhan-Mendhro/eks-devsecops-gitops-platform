resource "aws_key_pair" "synopsis" {
  key_name   = var.ssh_key_name
  public_key = file("${path.module}/keys/Synopsis.pub") # Reads local public key
}

resource "aws_instance" "synopsis" {
  ami                         = var.ami_id # Ubuntu 24.04 AMI
  instance_type               = var.instance_type
  availability_zone           = var.availability_zone
  key_name                    = aws_key_pair.synopsis.key_name
  vpc_security_group_ids      = [aws_security_group.synopsis.id]
  associate_public_ip_address = true


  root_block_device {
    volume_size           = var.root_volume_size
    volume_type           = gp3
    encrypted             = true #Enables EBS encryption
    delete_on_termination = true # Deletes volume when instance terminates
  }

  metadata_options {
    http_endpoint = "enabled"  # Enables EC2 metadata
    http_tokens   = "required" # Requires IMDSv2
  }

  tags = {
    Name = var.project_name # Displays Synopsis as EC2 instance name
  }
}
