data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "synopsis" {
  name        = "${var.project_name}-sg"
  description = "Security Group for synopsis application infra"
  vpc_id      = data.aws_vpc.default.id


  tags = {
    Name = "${var.project_name}-sg"
  }

}


resource "aws_vpc_security_group_ingress_rule" "ssh" {
  security_group_id = aws_security_group.synopsis.id
  description       = "SSH access"
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
  cidr_ipv4         = var.admin_cidr
}


resource "aws_vpc_security_group_ingress_rule" "jenkins" {
  security_group_id = aws_security_group.synopsis.id
  description       = "Jenkins web server"
  from_port         = 8080
  to_port           = 8080
  ip_protocol       = "tcp"
  cidr_ipv4         = var.admin_cidr
}

resource "aws_vpc_security_group_ingress_rule" "sonarqube" {
  security_group_id = aws_security_group.synopsis.id
  description       = "SonarQube web Server"
  from_port         = 9000
  to_port           = 9000
  ip_protocol       = "tcp"
  cidr_ipv4         = var.admin_cidr
}


resource "aws_vpc_security_group_egress_rule" "outbound" {
  security_group_id = aws_security_group.synopsis.id
  description       = "Allow outbound traffic"
  ip_protocol       = "-1"        #All protocols
  cidr_ipv4         = "0.0.0.0/0" #Allow all outbound IPV4 traffic
}
