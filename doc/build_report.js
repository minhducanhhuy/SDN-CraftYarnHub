const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const HTMLtoDOCX = require('html-to-docx');

function insertBeforeNextMermaid(content, sectionHeader, imageMarkdown) {
  if (content.includes(imageMarkdown)) return content;
  const idx = content.indexOf(sectionHeader);
  if (idx === -1) {
    console.warn('Header not found:', sectionHeader);
    return content;
  }
  const afterHeader = content.substring(idx);
  const mermaidIdx = afterHeader.indexOf('```mermaid');
  if (mermaidIdx === -1) {
    console.warn('```mermaid not found after header:', sectionHeader);
    return content;
  }
  const globalMermaidIdx = idx + mermaidIdx;
  return content.substring(0, globalMermaidIdx) + imageMarkdown + '\n\n' + content.substring(globalMermaidIdx);
}

async function buildConsolidatedReport() {
  console.log('1. Reading clean source files...');
  const cpPath = path.join(__dirname, 'doc', 'COURSE_PROJECT_REPORT_CRAFTYARNHUB.md');
  const srsPath = path.join(__dirname, 'doc', 'SRS_TIENG_VIET_CRAFTYARNHUB.md');

  let cp = fs.readFileSync(cpPath, 'utf-8').replace(/\r\n/g, '\n');
  let srs = fs.readFileSync(srsPath, 'utf-8').replace(/\r\n/g, '\n');

  console.log('2. Inserting image tags for all diagrams in chapters...');

  // DIA-01: Context Diagram
  cp = insertBeforeNextMermaid(
    cp,
    '### II.3 Context Diagram',
    '![Sơ Đồ Ngữ Cảnh Hệ Thống DIA-01](./diagrams/images/01_context_diagram.png)\n*Hình 2.1: Sơ đồ ngữ cảnh trao đổi dữ liệu hệ thống CraftYarnHub (DIA-01)*'
  );

  // DIA-02: Use Case Diagram
  cp = insertBeforeNextMermaid(
    cp,
    '##### Sơ đồ Tổng quan Hệ thống (System Use Case Diagram)',
    '![Sơ Đồ Use Case Tổng Thể 16 Chức Năng DIA-02](./diagrams/images/02_system_usecase_diagram.png)\n*Hình 2.2: Sơ đồ Use Case tổng thể toàn bộ 16 chức năng của hệ thống (DIA-02)*'
  );

  // DIA-06: Activity Checkout
  cp = insertBeforeNextMermaid(
    cp,
    '##### Activity Diagram 1: Quy Trình Đặt Hàng Trực Tuyến (Checkout Workflow)',
    '![Sơ Đồ Hoạt Động Quy Trình Thanh Toán DIA-06](./diagrams/images/06_activity_checkout.png)\n*Hình 2.3: Sơ đồ hoạt động quy trình đặt hàng và thanh toán trực tuyến (DIA-06)*'
  );

  // DIA-07: Activity Row Counter
  cp = insertBeforeNextMermaid(
    cp,
    '##### Activity Diagram 2: Quy Trình Móc Len Với Trợ Lý Đếm Hàng (Row Counter)',
    '![Sơ Đồ Hoạt Động Trợ Lý Đếm Hàng DIA-07](./diagrams/images/07_activity_row_counter.png)\n*Hình 2.4: Sơ đồ hoạt động trợ lý đếm hàng móc len với Web Audio API (DIA-07)*'
  );

  // DIA-09: Class Diagram Entities
  cp = insertBeforeNextMermaid(
    cp,
    '### III.1 High-Level Class Diagram (Structural Model)',
    '![Sơ Đồ Lớp Thực Thể Dữ Liệu DIA-09](./diagrams/images/09_class_diagram_entities.png)\n*Hình 3.1: Sơ đồ lớp phân tích thực thể dữ liệu hệ thống (DIA-09)*'
  );

  // DIA-05: Sequence Submit Comment
  cp = insertBeforeNextMermaid(
    cp,
    '##### Sequence Diagram 1: Đánh Giá & Bình Luận Chart Móc Len',
    '![Sơ Đồ Tuần Tự Đánh Giá & Bình Luận DIA-05](./diagrams/images/05_sequence_submit_comment.png)\n*Hình 3.2: Sơ đồ tuần tự gửi đánh giá sao và bình luận mẫu chart (DIA-05)*'
  );

  // DIA-04: Sequence Like $inc
  cp = insertBeforeNextMermaid(
    cp,
    '##### Sequence Diagram 2: Thả Tim Chart Với Toán Tử Atomic `$inc`',
    '![Sơ Đồ Tuần Tự Xem & Thả Tim DIA-04](./diagrams/images/04_sequence_view_like_pattern.png)\n*Hình 3.3: Sơ đồ tuần tự xem chi tiết chart và thả tim với toán tử atomic $inc (DIA-04)*'
  );

  // DIA-08: State Order Status
  cp = insertBeforeNextMermaid(
    cp,
    '### III.3 State Machine Diagram (Behavioral Model)',
    '![Sơ Đồ Máy Trạng Thái Đơn Hàng DIA-08](./diagrams/images/08_state_order_status.png)\n*Hình 3.5: Sơ đồ máy trạng thái chu trình xử lý đơn hàng (DIA-08)*'
  );

  // DIA-10: Component Diagram
  cp = insertBeforeNextMermaid(
    cp,
    '#### IV.3.1 Component Diagram',
    '![Sơ Đồ Thành Phần Vật Lý DIA-10](./diagrams/images/10_component_diagram.png)\n*Hình 4.1: Sơ đồ thành phần vật lý kiến trúc Client - Server (DIA-10)*'
  );

  console.log('3. Extracting Use Cases and Database Design from SRS...');
  const srs52Start = srs.indexOf('### 5.2 Đặc Tả Chi Tiết 16 Use Cases');
  const srs6Start = srs.indexOf('## 6. CẤU TRÚC CƠ SỞ DỮ LIỆU MONGODB');
  const srs7Start = srs.indexOf('## 7. DANH MỤC RESTFUL API');

  let ucsSection = srs.substring(srs52Start, srs6Start).trim();
  ucsSection = ucsSection.replace(
    '### 5.2 Đặc Tả Chi Tiết 16 Use Cases (Dạng Bảng Chuẩn)',
    '### II.6.3 Đặc Tả Chi Tiết Toàn Bộ 16 Use Cases (Dạng Bảng Chuẩn 15 Dòng Karl Wiegers)'
  );

  let dbSection = srs.substring(srs6Start, srs7Start).trim();
  dbSection = dbSection.replace(
    '## 6. CẤU TRÚC CƠ SỞ DỮ LIỆU MONGODB & SCHEMA CODE',
    '### IV.5 Thiết Kế Cơ Sở Dữ Liệu MongoDB & Mongoose Schema Toàn Diện'
  );
  dbSection = dbSection.replace(/### 6\.1/g, '#### IV.5.1');
  dbSection = dbSection.replace(/### 6\.2/g, '#### IV.5.2');
  dbSection = dbSection.replace(/### 6\.3/g, '#### IV.5.3');
  dbSection = dbSection.replace(/### 6\.4/g, '#### IV.5.4');
  dbSection = dbSection.replace(/### 6\.5/g, '#### IV.5.5');
  dbSection = dbSection.replace(/### 6\.6/g, '#### IV.5.6');
  dbSection = dbSection.replace(/### 6\.7/g, '#### IV.5.7');

  const apiStart = srs.indexOf('### 7.1 Danh Mục RESTful API Đầy Đủ');
  const apiEnd = srs.indexOf('### 7.2 Danh Mục Tài Nguyên Sơ Đồ');
  const apiSection = srs.substring(apiStart, apiEnd).trim();

  console.log('4. Assembling Master Consolidated Markdown...');
  const cpHeaderEnd = cp.indexOf('## II. REQUIREMENT SPECIFICATION');
  const cpSec2End = cp.indexOf('### II.6.3 Use Case Descriptions');
  const cpActStart = cp.indexOf('### II.6.4 Activity Diagrams');
  const cpSec3End = cp.indexOf('### IV.5 Database Design (MongoDB / Mongoose ODM)');
  const cpSec5Start = cp.indexOf('## V. IMPLEMENTATION');
  const cpSec6End = cp.indexOf('## VII. KẾT LUẬN & ĐÁNH GIÁ TỔNG KẾT');

  const part1_Intro = cp.substring(0, cpHeaderEnd).trim();
  const part2_ReqStart = cp.substring(cpHeaderEnd, cpSec2End).trim();
  const part3_ActAndSec3 = cp.substring(cpActStart, cpSec3End).trim();
  const part4_ImplAndSec6 = cp.substring(cpSec5Start, cpSec6End).trim();
  const conclusionPart = cp.substring(cpSec6End).trim().replace('## VII.', '## VIII.');

  const toc = `## MỤC LỤC TỔNG HỢP TOÀN BỘ BÁO CÁO (CONSOLIDATED TOC)

- [RECORD OF CHANGES (LỊCH SỬ THAY ĐỔI)](#record-of-changes)
- [I. OVERVIEW (VISION AND SCOPE - TỔNG QUAN DỰ ÁN)](#i-overview-vision-and-scope)
  - [I.1 Project Information](#i1-project-information)
  - [I.2 Project Team & Responsibility Breakdown (3 Thành Viên)](#i2-project-team)
  - [I.3 Business Opportunity and Objectives (BO-1 đến BO-4)](#i3-business-opportunity-and-objectives)
  - [I.4 Project Priorities Matrix](#i4-project-priorities)
- [II. REQUIREMENT SPECIFICATION (SRS - ĐẶC TẢ YÊU CẦU TOÀN DIỆN)](#ii-requirement-specification)
  - [II.1 Problem Description](#ii1-problem-description)
  - [II.2 Major Features (FE-01 đến FE-07)](#ii2-major-features)
  - [II.3 Context Diagram (DIA-01)](#ii3-context-diagram)
  - [II.4 Non-Functional Requirements (NFR-01 đến NFR-06)](#ii4-non-functional-requirements-nfr)
  - [II.5 Business Rules (BR-01 đến BR-08)](#ii5-business-rules)
  - [II.6 Functional Requirements](#ii6-functional-requirements)
    - [II.6.1 Actors (Visitor, Customer, Administrator)](#ii61-actors)
    - [II.6.2 System Use Case Diagram (DIA-02)](#ii62-use-case-diagrams)
    - [II.6.3 Đặc Tả Chi Tiết Toàn Bộ 16 Use Cases (Dạng Bảng Chuẩn 15 Dòng Karl Wiegers)](#ii63-đặc-tả-chi-tiết-toàn-bộ-16-use-cases-dạng-bảng-chuẩn-15-dòng-karl-wiegers)
    - [II.6.4 Activity Diagrams (DIA-06 & DIA-07)](#ii64-activity-diagrams)
- [III. ANALYSIS MODELS (CÁC MÔ HÌNH PHÂN TÍCH)](#iii-analysis-models)
  - [III.1 High-Level Class Diagram (Structural Model - DIA-09)](#iii1-high-level-class-diagram-structural-model)
  - [III.2 Interaction Diagrams (Sequence Diagrams DIA-03, DIA-04, DIA-05)](#iii2-interaction-diagrams)
  - [III.3 State Machine Diagram (Order Lifecycle - DIA-08)](#iii3-state-machine-diagram-behavioral-model)
- [IV. DESIGN SPECIFICATION (THIẾT KẾ KIẾN TRÚC & CSDL)](#iv-design-specification)
  - [IV.1 Integrated Communication Diagrams](#iv1-integrated-communication-diagrams)
  - [IV.2 System High-Level Design (Client - Server Architecture)](#iv2-system-high-level-design-client---server-architecture)
  - [IV.3 Component and Package Diagram (DIA-10)](#iv3-component-and-package-diagram)
  - [IV.4 Implementation Class Diagrams](#iv4-implementation-class-diagrams)
  - [IV.5 Thiết Kế Cơ Sở Dữ Liệu MongoDB & Mongoose Schema Toàn Diện (DIA-11, 6 Collections)](#iv5-thiết-kế-cơ-sở-dữ-liệu-mongodb--mongoose-schema-toàn-diện)
- [V. IMPLEMENTATION (HIỆN THỰC HÓA MÃ NGUỒN)](#v-implementation)
  - [V.1 Map Architecture to the Structure of the Project](#v1-map-architecture-to-the-structure-of-the-project)
  - [V.2 Map Class Diagram and Interaction Diagram to Code ($inc, Sub-document, Web Audio)](#v2-map-class-diagram-and-interaction-diagram-to-code)
- [VI. APPLYING ALTERNATIVE ARCHITECTURE PATTERNS (KIẾN TRÚC NÂNG CAO)](#vi-applying-alternative-architecture-patterns)
  - [VI.1 Applying Service-Oriented Architecture (SOA) / Microservices (DIA-12)](#vi1-applying-service-oriented-architecture-soa--microservices)
  - [VI.2 Applying Service Discovery Pattern (DIA-13)](#vi2-applying-service-discovery-pattern)
- [VII. DANH MỤC RESTFUL API & TÀI NGUYÊN SƠ ĐỒ HỆ THỐNG](#vii-danh-mục-restful-api--tài-nguyên-sơ-đồ-hệ-thống)
  - [VII.1 Danh Mục RESTful API Đầy Đủ](#vii1-danh-mục-restful-api-đầy-đủ)
  - [VII.2 Danh Mục 13 Sơ Đồ Hệ Thống Đính Kèm (PNG, SVG, MMD)](#vii2-danh-mục-13-sơ-đồ-hệ-thống-đính-kèm-tệp-ảnh-png-vector-svg--mã-nguồn)
- [VIII. KẾT LUẬN & ĐÁNH GIÁ TỔNG KẾT (CONCLUSION)](#viii-kết-luận--đánh-giá-tổng-kết)
  - [VIII.1 Đánh Giá Mức Độ Hoàn Thiện (100% Không Mock Data)](#viii1-đánh-giá-mức-độ-hoàn-thiện)
  - [VIII.2 Đánh Giá Phân Công Nhóm Cân Bằng](#viii2-đánh-giá-phân-công-nhóm)
  - [VIII.3 Hướng Phát Triển Mở Rộng](#viii3-hướng-phát-triển)
`;

  const sec7_2 = `### VII.2 Danh Mục 13 Sơ Đồ Hệ Thống Đính Kèm (Tệp Ảnh PNG, Vector SVG & Mã Nguồn)

Tất cả 13 sơ đồ phân tích và thiết kế của dự án đã được kết xuất sẵn thành các tệp tin hình ảnh riêng biệt độ nét cao (**PNG** và vector **SVG**) cùng tệp mã nguồn Mermaid (**MMD**) độc lập đặt tại thư mục [\`doc/diagrams/\`](./diagrams/) kèm một trang HTML giao diện đồ họa vector tương tác trực tiếp:

- **Bảng chú thích chi tiết:** [\`doc/diagrams/DANH_MUC_SO_DO.md\`](./diagrams/DANH_MUC_SO_DO.md)
- **Trang xem toàn bộ sơ đồ đồ họa trực quan:** [\`doc/diagrams/view_diagrams.html\`](./diagrams/view_diagrams.html) *(Mở bằng trình duyệt Chrome/Edge là xem và zoom phóng to được ngay lập tức)*.

| STT | Mã Sơ Đồ | Tên Sơ Đồ Tiếng Việt | Loại Sơ Đồ | Tệp Ảnh PNG | Tệp Vector SVG | Mã Nguồn MMD |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | \`DIA-01\` | **Sơ Đồ Ngữ Cảnh Hệ Thống (Context Diagram)** | Architecture / Data Flow | [\`01_context_diagram.png\`](./diagrams/images/01_context_diagram.png) | [\`01_context_diagram.svg\`](./diagrams/images/01_context_diagram.svg) | [\`01_context_diagram.mmd\`](./diagrams/01_context_diagram.mmd) |
| **02** | \`DIA-02\` | **Sơ Đồ Use Case Tổng Thể (16 Chức Năng)** | Use Case Diagram | [\`02_system_usecase_diagram.png\`](./diagrams/images/02_system_usecase_diagram.png) | [\`02_system_usecase_diagram.svg\`](./diagrams/images/02_system_usecase_diagram.svg) | [\`02_system_usecase_diagram.mmd\`](./diagrams/02_system_usecase_diagram.mmd) |
| **03** | \`DIA-03\` | **Sơ Đồ Tuần Tự Quy Trình Đặt Hàng** | Sequence Diagram | [\`03_sequence_checkout_order.png\`](./diagrams/images/03_sequence_checkout_order.png) | [\`03_sequence_checkout_order.svg\`](./diagrams/images/03_sequence_checkout_order.svg) | [\`03_sequence_checkout_order.mmd\`](./diagrams/03_sequence_checkout_order.mmd) |
| **04** | \`DIA-04\` | **Sơ Đồ Tuần Tự Xem Chi Tiết & Thả Tim Chart** | Sequence Diagram | [\`04_sequence_view_like_pattern.png\`](./diagrams/images/04_sequence_view_like_pattern.png) | [\`04_sequence_view_like_pattern.svg\`](./diagrams/images/04_sequence_view_like_pattern.svg) | [\`04_sequence_view_like_pattern.mmd\`](./diagrams/04_sequence_view_like_pattern.mmd) |
| **05** | \`DIA-05\` | **Sơ Đồ Tuần Tự Gửi Đánh Giá & Bình Luận Sao** | Sequence Diagram | [\`05_sequence_submit_comment.png\`](./diagrams/images/05_sequence_submit_comment.png) | [\`05_sequence_submit_comment.svg\`](./diagrams/images/05_sequence_submit_comment.svg) | [\`05_sequence_submit_comment.mmd\`](./diagrams/05_sequence_submit_comment.mmd) |
| **06** | \`DIA-06\` | **Sơ Đồ Hoạt Động Quy Trình Thanh Toán Giỏ Hàng** | Activity Diagram | [\`06_activity_checkout.png\`](./diagrams/images/06_activity_checkout.png) | [\`06_activity_checkout.svg\`](./diagrams/images/06_activity_checkout.svg) | [\`06_activity_checkout.mmd\`](./diagrams/06_activity_checkout.mmd) |
| **07** | \`DIA-07\` | **Sơ Đồ Hoạt Động Trợ Lý Đếm Hàng Móc Len** | Activity Diagram | [\`07_activity_row_counter.png\`](./diagrams/images/07_activity_row_counter.png) | [\`07_activity_row_counter.svg\`](./diagrams/images/07_activity_row_counter.svg) | [\`07_activity_row_counter.mmd\`](./diagrams/07_activity_row_counter.mmd) |
| **08** | \`DIA-08\` | **Sơ Đồ Máy Trạng Thái Đơn Hàng (State Machine)** | State Machine Diagram | [\`08_state_order_status.png\`](./diagrams/images/08_state_order_status.png) | [\`08_state_order_status.svg\`](./diagrams/images/08_state_order_status.svg) | [\`08_state_order_status.mmd\`](./diagrams/08_state_order_status.mmd) |
| **09** | \`DIA-09\` | **Sơ Đồ Lớp Thực Thể Dữ Liệu (Class Diagram)** | Class Diagram | [\`09_class_diagram_entities.png\`](./diagrams/images/09_class_diagram_entities.png) | [\`09_class_diagram_entities.svg\`](./diagrams/images/09_class_diagram_entities.svg) | [\`09_class_diagram_entities.mmd\`](./diagrams/09_class_diagram_entities.mmd) |
| **10** | \`DIA-10\` | **Sơ Đồ Thành Phần Vật Lý (Component Diagram)** | Component Diagram | [\`10_component_diagram.png\`](./diagrams/images/10_component_diagram.png) | [\`10_component_diagram.svg\`](./diagrams/images/10_component_diagram.svg) | [\`10_component_diagram.mmd\`](./diagrams/10_component_diagram.mmd) |
| **11** | \`DIA-11\` | **Sơ Đồ Quan Hệ Thực Thể CSDL MongoDB (ERD)** | Entity-Relationship Diagram | [\`11_database_erd.png\`](./diagrams/images/11_database_erd.png) | [\`11_database_erd.svg\`](./diagrams/images/11_database_erd.svg) | [\`11_database_erd.mmd\`](./diagrams/11_database_erd.mmd) |
| **12** | \`DIA-12\` | **Sơ Đồ Triển Khai Kiến Trúc SOA (Deployment)** | SOA Deployment Diagram | [\`12_soa_deployment.png\`](./diagrams/images/12_soa_deployment.png) | [\`12_soa_deployment.svg\`](./diagrams/images/12_soa_deployment.svg) | [\`12_soa_deployment.mmd\`](./diagrams/12_soa_deployment.mmd) |
| **13** | \`DIA-13\` | **Sơ Đồ Khám Phá Dịch Vụ Service Discovery** | Sequence Diagram | [\`13_service_discovery.png\`](./diagrams/images/13_service_discovery.png) | [\`13_service_discovery.svg\`](./diagrams/images/13_service_discovery.svg) | [\`13_service_discovery.mmd\`](./diagrams/13_service_discovery.mmd) |
`;

  const seq3Part = `
##### Sequence Diagram 3: Quy Trình Đặt Hàng Trực Tuyến Sub-Document (Checkout Workflow - DIA-03)

- **Mục đích:** Mô tả chi tiết việc gửi đơn hàng từ giỏ hàng client, controller kiểm tra qua DTO, service sinh mã ngẫu nhiên \`ORD-xxxx\`, lưu mảng Sub-documents \`items\` vào MongoDB và trả về mã đơn hàng cho khách.

![Sơ Đồ Tuần Tự Đặt Hàng Trực Tuyến DIA-03](./diagrams/images/03_sequence_checkout_order.png)
*Hình 3.4: Sơ đồ tuần tự xử lý luồng đặt hàng trực tuyến và lưu mảng Sub-document (DIA-03)*

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Customer as Khách Mua Hàng
    participant CartUI as CartPage (React Client)
    participant OrderCtrl as OrdersController (NestJS)
    participant OrderSvc as OrdersService (NestJS)
    participant Mongo as MongoDB (orders collection)

    Customer->>CartUI: Nhập thông tin & bấm "Xác Nhận Đặt Hàng"
    CartUI->>OrderCtrl: POST /api/orders (CreateOrderDto)
    OrderCtrl->>OrderSvc: create(dto)
    Note over OrderSvc: 1. Validate danh sách items không rỗng\\n2. Sinh mã đơn ORD-xxxx\\n3. Tính tổng tiền & gán trạng thái 'Chờ xác nhận'
    OrderSvc->>Mongo: new this.orderModel(orderData).save()
    Mongo-->>OrderSvc: Trả về Document đơn hàng vừa lưu
    OrderSvc-->>OrderCtrl: Order Entity
    OrderCtrl-->>CartUI: HTTP 201 Created { success: true, data: order }
    Note over CartUI: Xóa sạch giỏ hàng (CartContext)\\nHiển thị Modal thành công kèm mã đơn
    CartUI-->>Customer: Thông báo đặt hàng thành công (Mã: ORD-xxxx)
\`\`\`
`;

  let part3WithSeq3 = part3_ActAndSec3;
  if (!part3WithSeq3.includes('Sequence Diagram 3: Quy Trình Đặt Hàng Trực Tuyến')) {
    part3WithSeq3 = part3WithSeq3.replace(
      '### III.3 State Machine Diagram (Behavioral Model)',
      seq3Part + '\n\n### III.3 State Machine Diagram (Behavioral Model)'
    );
  }

  let part4WithDiagrams = part4_ImplAndSec6;
  if (!part4WithDiagrams.includes('12_soa_deployment.png')) {
    part4WithDiagrams = part4WithDiagrams.replace(
      '#### 3. Sơ Đồ Kiến Trúc Đề Xuất (SOA Deployment Diagram)\n\n```mermaid',
      '#### 3. Sơ Đồ Kiến Trúc Đề Xuất (SOA Deployment Diagram)\n\n![Sơ Đồ Triển Khai Kiến Trúc SOA DIA-12](./diagrams/images/12_soa_deployment.png)\n*Hình 6.1: Sơ đồ triển khai kiến trúc hướng dịch vụ SOA / Microservices (DIA-12)*\n\n```mermaid'
    );
  }
  if (!part4WithDiagrams.includes('13_service_discovery.png')) {
    part4WithDiagrams = part4WithDiagrams.replace(
      '#### 3. Sơ Đồ Khám Phá Dịch Vụ (Service Discovery Diagram)\n\n```mermaid',
      '#### 3. Sơ Đồ Khám Phá Dịch Vụ (Service Discovery Diagram)\n\n![Sơ Đồ Khám Phá Dịch Vụ Service Discovery DIA-13](./diagrams/images/13_service_discovery.png)\n*Hình 6.2: Sơ đồ tương tác đăng ký và khám phá dịch vụ tự động (DIA-13)*\n\n```mermaid'
    );
  }

  const masterMd = `${part1_Intro}

---

${toc}

---

${part2_ReqStart}

${ucsSection}

${part3WithSeq3}

${dbSection}

---

${part4WithDiagrams}

---

## VII. DANH MỤC RESTFUL API & TÀI NGUYÊN SƠ ĐỒ HỆ THỐNG

${apiSection}

---

${sec7_2}

---

${conclusionPart}
`;

  const finalMd = masterMd.replace(
    /## TABLE OF CONTENTS[\s\S]*?(?=## RECORD OF CHANGES)/,
    ''
  );

  console.log('5. Writing Consolidated Markdown Files...');
  const finalMdPath = path.join(__dirname, 'doc', 'COURSE_PROJECT_REPORT_FINAL_CRAFTYARNHUB.md');
  const mainMdPath = path.join(__dirname, 'doc', 'COURSE_PROJECT_REPORT_CRAFTYARNHUB.md');
  fs.writeFileSync(finalMdPath, finalMd, 'utf-8');
  fs.writeFileSync(mainMdPath, finalMd, 'utf-8');

  console.log('Master Markdown written! Total lines:', finalMd.split('\n').length);

  console.log('6. Converting Markdown to HTML with all 13 base64 embedded images...');
  const imgDir = path.join(__dirname, 'doc', 'diagrams', 'images');
  let html = marked.parse(finalMd);

  // Replace markdown img tags with centered base64 image paragraphs
  const imgRegex = /<img\s+src="([^"]+)"\s+alt="([^"]*)"[^>]*>/g;
  let inlinedCount = 0;
  html = html.replace(imgRegex, (match, src, alt) => {
    let cleanSrc = src.replace(/^\.\/diagrams\/images\//, '').replace(/^diagrams\/images\//, '');
    const imgPath = path.join(imgDir, cleanSrc);
    if (fs.existsSync(imgPath)) {
      inlinedCount++;
      const b64 = fs.readFileSync(imgPath).toString('base64');
      const ext = path.extname(cleanSrc).toLowerCase().replace('.', '');
      const mime = ext === 'png' ? 'image/png' : (ext === 'svg' ? 'image/svg+xml' : 'image/jpeg');
      return `<p style="text-align: center; margin: 18pt 0;"><img src="data:${mime};base64,${b64}" width="600" alt="${alt}" /></p>`;
    }
    return match;
  });
  console.log('Inlined', inlinedCount, 'images as base64 in HTML!');

  const styledHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>BÁO CÁO ĐỒ ÁN MÔN HỌC & ĐẶC TẢ YÊU CẦU PHẦN MỀM - CRAFTYARNHUB</title>
<style>
  body {
    font-family: 'Times New Roman', serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #1a1a1a;
  }
  h1 {
    font-size: 20pt;
    color: #b91c1c;
    text-align: center;
    font-weight: bold;
    margin-top: 24pt;
    margin-bottom: 12pt;
  }
  h2 {
    font-size: 15pt;
    color: #991b1b;
    border-bottom: 2px solid #f87171;
    padding-bottom: 4pt;
    margin-top: 20pt;
    margin-bottom: 8pt;
  }
  h3 {
    font-size: 13pt;
    color: #1e293b;
    margin-top: 14pt;
    margin-bottom: 6pt;
  }
  h4 {
    font-size: 12pt;
    color: #334155;
    font-weight: bold;
    margin-top: 10pt;
    margin-bottom: 4pt;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0;
    font-size: 10.5pt;
  }
  th {
    background-color: #f1f5f9;
    color: #0f172a;
    font-weight: bold;
    border: 1px solid #cbd5e1;
    padding: 6pt 8pt;
    text-align: left;
  }
  td {
    border: 1px solid #cbd5e1;
    padding: 5pt 8pt;
    vertical-align: top;
  }
  pre {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 8pt;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 9.5pt;
    line-height: 1.3;
    white-space: pre-wrap;
  }
  code {
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 10pt;
    background-color: #f1f5f9;
    padding: 1pt 3pt;
    border-radius: 3pt;
  }
  blockquote {
    border-left: 4px solid #f87171;
    background-color: #fff1f2;
    padding: 6pt 12pt;
    margin: 8pt 0;
    font-style: italic;
  }
</style>
</head>
<body>
${html}
</body>
</html>`;

  console.log('7. Generating Consolidated Word Document (.docx)...');
  const docxOptions = {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
    font: 'Times New Roman',
    fontSize: 12,
    margins: {
      top: 1440,
      right: 1440,
      bottom: 1440,
      left: 1440
    },
    title: 'SDN302 - Báo Cáo Đồ Án Môn Học CraftYarnHub'
  };

  const docxBuffer = await HTMLtoDOCX(styledHtml, null, docxOptions);

  const finalDocxPath = path.join(__dirname, 'doc', 'COURSE_PROJECT_REPORT_FINAL_CRAFTYARNHUB.docx');
  const mainDocxPath = path.join(__dirname, 'doc', 'COURSE_PROJECT_REPORT_CRAFTYARNHUB.docx');

  fs.writeFileSync(finalDocxPath, docxBuffer);
  fs.writeFileSync(mainDocxPath, docxBuffer);

  console.log('======================================================');
  console.log('CONSOLIDATION COMPLETED SUCCESSFULLY!');
  console.log('Master Markdown:', finalMdPath);
  console.log('Master Markdown Size:', fs.statSync(finalMdPath).size, 'bytes (', finalMd.split('\n').length, 'lines )');
  console.log('Master Word Size:', fs.statSync(finalDocxPath).size, 'bytes (~', Math.round(fs.statSync(finalDocxPath).size / 1024), 'KB )');
  console.log('Synced to:', mainDocxPath);
  console.log('======================================================');
}

buildConsolidatedReport().catch(err => {
  console.error('Build Error:', err);
  process.exit(1);
});
