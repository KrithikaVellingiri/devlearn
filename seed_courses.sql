BEGIN;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'systems-design-for-digital-architects', 'Systems Design for Digital Architects', 'Master the architectural patterns that power the world''s most scalable applications. This intensive program moves beyond simple CRUD applications into the realm of distributed systems, high-availability clusters, and global-scale data consistency models. You will learn to think like a Principal Engineer, balancing trade-offs in CAP theorem, latency, and throughput.', '{"name": "Dr. Aris Thorne", "title": "EX-PRINCIPAL ENGINEER | AWS & META", "bio": "Aris has spent two decades building the backbone of the modern web. He specializes in distributed database consistency and high-availability cloud infrastructure.", "students": "450K Students", "courses": "12 Courses", "avatar": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80"}', '$149.99', 149.99, 499.99, '70% OFF', 'System Design', 'Advanced', 4.9, 2040, '2,040 ratings', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "14 MIN", "type": "reading"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "13:33", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "12:43", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "13:22", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "13:31", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "22:47", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "23:17", "type": "video"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "25:46", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "16:12", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "20:07", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "19:53", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "12 MIN", "type": "reading"}]}]', 'PROFESSIONAL TRACK', '12,450 enrolled', 'Oct 2024', 150, '2024-10-01', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'scalable-microservices-architecture', 'Architecting Scalable Microservices with Go', 'Dive deep into Go microservices, exploring gRPC, message brokers (Kafka), and event-driven architectural patterns used in modern scalable enterprises.', '{"name": "Sarah Chen", "title": "SENIOR GO ENGINEER", "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"}', '$1,299.00', 1299.0, NULL, NULL, 'System Design', 'Intermediate', 4.9, 1024, '1,024 ratings', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1470', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "19:09", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "14:56", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "8 MIN", "type": "reading"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "5 MIN", "type": "reading"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "9 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "22:20", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "10 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "23:04", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "5:01", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "15 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "22:27", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "7 MIN", "type": "reading"}]}]', 'BOOTCAMP STRATEGY', '8,100 enrolled', 'Jan 2024', 100, '2024-01-10', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'kubernetes-zero-trust', 'Hardening Kubernetes: The Zero-Trust Framework', 'Implement zero-trust security architecture across Kubernetes clusters. Understand RBAC, network policies, identity-aware proxies, and runtime security.', '{"name": "Marcus Thorne", "title": "CISO", "avatar": "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&q=80"}', '$849.00', 849.0, 1200.0, '30% OFF', 'Security Architecture', 'Intermediate', 4.7, 846, '846 ratings', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1470', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "11:07", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "17:22", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "11 MIN", "type": "reading"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "22:40", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "20:03", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "12:24", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "6:30", "type": "video"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "17:02", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "11 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "10 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "18:22", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "7 MIN", "type": "reading"}]}]', 'CYBERSECURITY TRACK', '5,400 enrolled', 'Nov 2023', 85, '2023-11-20', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'observability-engineering', 'Observability Engineering: Tracing the Void', 'Learn OpenTelemetry from the ground up to add trace analytics to monolithic and microservice systems, accelerating MTTR in incident response.', '{"name": "Adrian Kos", "title": "SRE MANAGER", "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80"}', '$720.00', 720.0, NULL, NULL, 'Distributed Systems', 'Advanced', 4.6, 620, '620 ratings', 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1488', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "22:01", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "13:37", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "10:29", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "21:49", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "14 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "17:29", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "12 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "18:39", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "7:42", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "11:59", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "9 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "10 MIN", "type": "reading"}]}]', 'SRE TRACK', '3,200 enrolled', 'Sep 2023', 75, '2023-09-15', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'aws-cloud-native', 'AWS Cloud Native Architectures', 'Your starting point for learning Amazon Web Services. Hands-on labs with ECS, Lambda, DynamoDB, API Gateway, and CloudFormation.', '{"name": "John D.", "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"}', '$199.00', 199.0, 299.0, '33% OFF', 'Cloud Infrastructure', 'Beginner', 4.4, 450, '450 ratings', 'https://images.unsplash.com/photo-1667375085698-fa3ebaf0a049?auto=format&fit=crop&q=80&w=1470', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "13:38", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "13:33", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "13:28", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "13:32", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "10 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "25:05", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "15 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "5:00", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "19:53", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "5:58", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "9:41", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "25:01", "type": "video"}]}]', 'FOUNDATION', '15,000 enrolled', 'May 2023', 60, '2023-05-15', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'kafka-event-streaming', 'Apache Kafka for Event-Driven Microservices', 'Master distributed event streaming with Apache Kafka. Learn to build fault-tolerant, high-throughput systems capable of handling millions of messages per second.', '{"name": "Elena Rostova", "title": "DATA ENGINEER", "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80"}', '$299.00', 299.0, 399.0, '25% OFF', 'Distributed Systems', 'Advanced', 4.8, 1205, '1,205 ratings', 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "15:25", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "24:58", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "8:52", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "8:24", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "19:55", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "20:02", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "18:26", "type": "video"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "8:31", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "9:10", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "24:25", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "18:46", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "13:51", "type": "video"}]}]', 'DATA TRACK', '8,500 enrolled', 'Feb 2024', 130, '2024-02-15', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'gcp-professional-architect', 'GCP Professional Cloud Architect Certification', 'Comprehensive guide to passing the Google Cloud Professional Architect exam. Covers networking, IAM, GKE, BigQuery, and enterprise migration strategies.', '{"name": "David Chen", "title": "GCP AUTHORIZED TRAINER", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"}', '$99.00', 99.0, 149.0, '33% OFF', 'Cloud Infrastructure', 'Intermediate', 4.6, 3500, '3,500 ratings', 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "10 MIN", "type": "reading"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "23:58", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "17:06", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "16:30", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "9 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "13 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "14 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "5:12", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "6 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "9 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "9 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "9:55", "type": "video"}]}]', 'CERTIFICATION', '25,000 enrolled', 'Mar 2024', 140, '2024-03-01', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'offensive-security-pentesting', 'Offensive Security & Penetration Testing', 'Practical ethical hacking course. Learn vulnerability exploitation, payload injection, privilege escalation, and how to defend systems from real-world attacks.', '{"name": "Alex Mercer", "title": "RED TEAM LEAD", "avatar": "https://images.unsplash.com/photo-1552058544-e2bfd3876985?w=200&q=80"}', '$599.00', 599.0, 899.0, '33% OFF', 'Security Architecture', 'Advanced', 4.9, 890, '890 ratings', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "13 MIN", "type": "reading"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "25:59", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "10:28", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "12 MIN", "type": "reading"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "10:31", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "13:18", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "10 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "21:59", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "24:45", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "25:31", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "20:03", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "18:15", "type": "video"}]}]', 'CYBERSECURITY TRACK', '4,200 enrolled', 'Dec 2023', 110, '2023-12-05', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'docker-containerization-mastery', 'Docker Containerization Mastery', 'The ultimate guide to building, running, and orchestrating Docker containers. From writing perfect Dockerfiles to managing multi-container stacks with Docker Compose.', '{"name": "Emma Watson", "title": "DEVOPS ENGINEER", "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"}', '$49.99', 49.99, 129.99, '61% OFF', 'Cloud Infrastructure', 'Beginner', 4.7, 5400, '5,400 ratings', 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "24:22", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "17:51", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "9 MIN", "type": "reading"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "25:57", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "11 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "22:42", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "5 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "23:02", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "17:48", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "24:30", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "20:37", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "11 MIN", "type": "reading"}]}]', 'FOUNDATION', '45,000 enrolled', 'Jan 2024', 160, '2024-01-20', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'grpc-microservices-nodejs', 'Building gRPC Microservices with Node.js', 'Replace heavy REST APIs with lightning-fast gRPC streams. Learn Protocol Buffers, service definitions, and bidirectional streaming in Node.js architectures.', '{"name": "Michael Lee", "title": "BACKEND ENGINEER", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"}', '$129.00', 129.0, 199.0, '35% OFF', 'System Design', 'Intermediate', 4.5, 650, '650 ratings', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "22:08", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "13:37", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "22:09", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "13:48", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "14:51", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "8 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "15:19", "type": "video"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "13 MIN", "type": "reading"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "19:59", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "11 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "12:46", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "14:44", "type": "video"}]}]', 'BACKEND TRACK', '3,800 enrolled', 'Nov 2023', 80, '2023-11-10', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'advanced-identity-access-management', 'Advanced Identity & Access Management', 'Design secure authentication models using OAuth2, OpenID Connect, and SAML. Understand token lifecycles, JWT vulnerabilities, and enterprise federation.', '{"name": "Sarah Chen", "title": "SENIOR GO ENGINEER", "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"}', '$349.00', 349.0, NULL, NULL, 'Security Architecture', 'Advanced', 4.8, 420, '420 ratings', 'https://images.unsplash.com/photo-1510511459019-5efa7c29be08?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "10:07", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "9:43", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "18:42", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "5:23", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "7:21", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "20:03", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "8:58", "type": "video"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "11:33", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "10 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "9:41", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "20:46", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "23:13", "type": "video"}]}]', 'CYBERSECURITY TRACK', '1,900 enrolled', 'Oct 2023', 70, '2023-10-05', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'redis-distributed-caching', 'Redis for Distributed Caching & Rate Limiting', 'Supercharge your microservices with Redis. Learn efficient caching strategies, session management, Pub/Sub, and distributed rate-limiting algorithms.', '{"name": "Dr. Aris Thorne", "title": "EX-PRINCIPAL ENGINEER | AWS & META", "avatar": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80"}', '$149.00', 149.0, 249.0, '40% OFF', 'Distributed Systems', 'Intermediate', 4.9, 2100, '2,100 ratings', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "15:16", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "10 MIN", "type": "reading"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "12:26", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "13 MIN", "type": "reading"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "25:06", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "15:06", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "20:18", "type": "video"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "23:24", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "6:44", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "19:58", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "21:14", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "20:29", "type": "video"}]}]', 'PROFESSIONAL TRACK', '11,200 enrolled', 'Mar 2024', 120, '2024-03-22', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'terraform-infrastructure-as-code', 'Infrastructure as Code with Terraform', 'Automate cloud provisioning safely and predictably. Learn to write reusable HCL modules, manage remote state securely, and apply policies with Sentinel.', '{"name": "John D.", "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"}', '$199.00', 199.0, 299.0, '33% OFF', 'Cloud Infrastructure', 'Intermediate', 4.6, 3800, '3,800 ratings', 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "5:13", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "6:04", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "17:01", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "23:09", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "10:00", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "24:06", "type": "video"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "11 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "9 MIN", "type": "reading"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "16:15", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "21:35", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "19:06", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "16:44", "type": "video"}]}]', 'DEVOPS TRACK', '32,000 enrolled', 'Apr 2024', 145, '2024-04-10', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'system-design-interviews', 'Cracking the System Design Interview', 'A focused curriculum designed to help you ace FAANG system design interviews. Covers designing WhatsApp, Netflix, Uber, and rate limiters step-by-step.', '{"name": "Dr. Aris Thorne", "avatar": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80"}', '$89.99', 89.99, 199.99, '55% OFF', 'System Design', 'Beg/Int', 5.0, 8500, '8,500 ratings', 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "14:07", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "5 MIN", "type": "reading"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "22:33", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "20:36", "type": "video"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "9:55", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "15 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "21:22", "type": "video"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "14 MIN", "type": "reading"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "8:21", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "7:47", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "8:06", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "11:41", "type": "video"}]}]', 'INTERVIEW PREP', '60,000 enrolled', 'Apr 2024', 180, '2024-04-15', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'azure-enterprise-security', 'Azure Enterprise Security & Penetration Testing', 'Protect and compromise Azure environments legally. Learn about Entra ID persistence, exploiting managed identities, and securing Azure Key Vault.', '{"name": "Marcus Thorne", "avatar": "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&q=80"}', '$420.00', 420.0, NULL, NULL, 'Security Architecture', 'Advanced', 4.5, 310, '310 ratings', 'https://images.unsplash.com/photo-1558485984-9de6b4f74f76?w=800&q=80', '[{"id": "01", "title": "Fundamentals & Onboarding", "lessons": [{"title": "Fundamentals & Onboarding - Part 1 : Deep Dive", "duration": "15 MIN", "type": "reading"}, {"title": "Fundamentals & Onboarding - Part 2 : Deep Dive", "duration": "6:04", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 3 : Deep Dive", "duration": "12:30", "type": "video"}, {"title": "Fundamentals & Onboarding - Part 4 : Deep Dive", "duration": "9 MIN", "type": "reading"}]}, {"id": "02", "title": "Core Implementation & Practice", "lessons": [{"title": "Core Implementation & Practice - Part 1 : Deep Dive", "duration": "13:13", "type": "video"}, {"title": "Core Implementation & Practice - Part 2 : Deep Dive", "duration": "8 MIN", "type": "reading"}, {"title": "Core Implementation & Practice - Part 3 : Deep Dive", "duration": "24:47", "type": "video"}, {"title": "Core Implementation & Practice - Part 4 : Deep Dive", "duration": "19:49", "type": "video"}]}, {"id": "03", "title": "Advanced Techniques & Scale", "lessons": [{"title": "Advanced Techniques & Scale - Part 1 : Deep Dive", "duration": "8:51", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 2 : Deep Dive", "duration": "13:34", "type": "video"}, {"title": "Advanced Techniques & Scale - Part 3 : Deep Dive", "duration": "13 MIN", "type": "reading"}, {"title": "Advanced Techniques & Scale - Part 4 : Deep Dive", "duration": "18:20", "type": "video"}]}]', 'CYBERSECURITY TRACK', '1,400 enrolled', 'Jan 2024', 65, '2024-01-25', '[{"id": "r1", "initials": "JG", "name": "Julianne G.", "role": "Senior Engineer", "rating": 5, "text": "This course changed the way I architect applications completely."}, {"id": "r2", "initials": "MK", "name": "Marcus K.", "role": "Technical Lead", "rating": 5, "text": "Exceptional quality and depth. Highly recommended."}]', '[{"text": "42 hours on-demand video", "iconName": "video"}, {"text": "15 technical whitepapers", "iconName": "paper"}, {"text": "Full lifetime access", "iconName": "infinity"}, {"text": "Hands-on coding exercises", "iconName": "terminal"}, {"text": "Certificate of completion", "iconName": "award"}]'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    instructor = EXCLUDED.instructor,
    price = EXCLUDED.price,
    "numericPrice" = EXCLUDED."numericPrice",
    "originalPrice" = EXCLUDED."originalPrice",
    discount = EXCLUDED.discount,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    rating = EXCLUDED.rating,
    "reviewsCount" = EXCLUDED."reviewsCount",
    "reviewsCountLabel" = EXCLUDED."reviewsCountLabel",
    image = EXCLUDED.image,
    curriculum = EXCLUDED.curriculum,
    track = EXCLUDED.track,
    enrolled = EXCLUDED.enrolled,
    "lastUpdated" = EXCLUDED."lastUpdated",
    popularity = EXCLUDED.popularity,
    date = EXCLUDED.date,
    reviews = EXCLUDED.reviews,
    includes = EXCLUDED.includes;
COMMIT;
