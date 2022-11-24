# WhaleShark AIoT Platform
WhaleShark AIoT 플랫폼에 대한 소스 코드를 관리하는 프로젝트 저장소 입니다. 
WhaleShark AIoT 플랫폼은 산업 현장에서 설치되어 데이터를 수집하고 처리하는 AIoT, IIoT 기기들과 각 센서들의 연결 제어를 하고 수집되는 데이터에 대한 저장 및 처리에 대한 기능을 수행하며 각각의 기기에서 동작하는 AI 모델 및 IoT 서비스에 대한 배포 기능을 수행하는 등의 AIoT 서비스를 운용하기 위한 핵심적인 기능들을 제공합니다.

<img src="git_images/whaleshark.png" width="600" > 

## 주요 기능

WhaleShark는 AIoT 플랫폼으로 아래 5가지 주요 기능을 가지고 있습니다.

* IoT 센서/기기 관리
  * 센서 기기의 정보를 등록하고 수집되는 데이터의 메타를 정의하는 기능
  * IoT 기기의 정보를 등록하고 연결되는 센서를 제어 및 모니터링하는 기능
* 데이터 관리
  * 센서로부터 수집되는 데이터를 관리하는 기능
  * Influx, HDFS, FileSystem, RDB(MaridaDB) 등 다양한 데이터 저장소를 지원
* AI 모델 관리
  * AI 모델 파일을 등록하고 AIoT 기기로 배포하는 기능
* IoT 서비스 관리
  * IoT 서비스 배포 파일을 등록하고 IoT 기기로 서비스를 배포하는 기능
* 사용자 관리
  * 플랫폼 사용자에 대한 로그인, 그룹, 접근 권한 등을 관리하는 기능

## 아키텍처

<img src="git_images/whaleShark_architecture.png" width="600" > 


## Installation
* 개발환경
  * OpenJDK 1.8
  * Spring Boot 

* 연결 기술
  * Hadoop
  * InfluxDB
  * Spark
  * MariaDB
  * rabiitMQ
