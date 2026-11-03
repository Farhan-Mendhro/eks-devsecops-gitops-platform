variable "aws_region" {
  description = "AWS region where infra will deploy"
  type        = string
  default     = "ap-south-1"
}


variable "project_name" {
  description = "App name used for resource identification"
  type        = string
  default     = "Synopsis"
}


variable "instance_type" {
  description = "EC2 Instance type"
  type        = string
  default     = "t3a.large"
}


variable "ami_id" {
  description = "Ubuntu 24.04 LTS AMI ID in Mumbai"
  type        = string
  default     = "ami-094adff9b24048c5c"
}

variable "availability_zone" {
  description = "Availability zone for Ec2"
  type        = string
  default     = "ap-south-1a"
}


variable "admin_cidr" {
  description = "Admin public IP in CIDR notation"
  type        = string
}

variable "ssh_key_name" {
  description = "AWS EC2 key pair name"
  type        = string
  default     = "Synopsis"
}

variable "root_volume_size" {
  description = "EC2 root storage size in GB"
  type        = number
  default     = 50
}
