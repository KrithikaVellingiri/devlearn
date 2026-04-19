
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    instructor JSONB NOT NULL,
    price TEXT NOT NULL,
    "numericPrice" NUMERIC NOT NULL,
    "originalPrice" NUMERIC,
    discount TEXT,
    category TEXT NOT NULL,
    level TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    "reviewsCount" INTEGER NOT NULL,
    "reviewsCountLabel" TEXT,
    image TEXT NOT NULL,
    curriculum JSONB NOT NULL,
    track TEXT,
    enrolled TEXT,
    "lastUpdated" TEXT,
    popularity INTEGER NOT NULL,
    date TEXT NOT NULL,
    reviews JSONB NOT NULL DEFAULT '[]'::JSONB,
    includes JSONB NOT NULL DEFAULT '[]'::JSONB
);

-- FIX: Enable RLS and allow public read access for the anon role.
-- Without this policy, Supabase returns data:[] with error:null (silent block).
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON public.courses
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'systems-design-for-digital-architects', 'Systems Design for Digital Architects', 'Master the architectural patterns that power the world''s most scalable applications. This intensive program moves beyond simple CRUD applications into the realm of distributed systems, high-availability clusters, and global-scale data consistency models. You will learn to think like a Principal Engineer, balancing trade-offs in CAP theorem, latency, and throughput.', '{"name":"Dr. Aris Thorne","title":"EX-PRINCIPAL ENGINEER | AWS & META","bio":"Aris has spent two decades building the backbone of the modern web. He specializes in distributed database consistency and high-availability cloud infrastructure.","students":"450K Students","courses":"12 Courses","avatar":"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80"}', '$149.99', 149.99, 499.99, '70% OFF', 'System Design', 'Advanced', 4.9, 2040, '2,040 ratings', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', '[{"id":"01","title":"Foundations of Scalability","lessons":[{"title":"Vertical vs Horizontal Scaling","duration":"12:45","type":"video"},{"title":"Load Balancing Algorithms","duration":"18:20","type":"video"},{"title":"Reading: The Fallacies of Distributed Computing","duration":"10 MIN","type":"reading"}]},{"id":"02","title":"Advanced Data Partitioning","lessons":[{"title":"Sharding Strategies","duration":"22:15","type":"video"}]},{"id":"03","title":"Distributed Consensus and Raft","lessons":[]}]', 'PROFESSIONAL TRACK', '12,450 enrolled', 'Oct 2024', 150, '2024-10-01', '[{"id":"r1","initials":"JG","name":"Julianne G.","role":"Senior Engineer","rating":5,"text":"\"The most comprehensive systems design course I''ve ever taken. It helped me pass my L6 interview at Google. The section on Consistency models is pure gold.\""},{"id":"r2","initials":"MK","name":"Marcus K.","role":"Technical Lead","rating":5,"text":"\"Practical, deep, and incredibly clear. Aris explains complex topics like Vector Clocks with remarkable simplicity. A must for anyone serious about architecture.\""}]', '[{"text":"42 hours on-demand video","iconName":"video"},{"text":"15 technical whitepapers","iconName":"paper"},{"text":"Full lifetime access","iconName":"infinity"},{"text":"4 Hands-on architectural labs","iconName":"terminal"},{"text":"Certificate of completion","iconName":"award"}]'
) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'scalable-microservices-architecture', 'Architecting Scalable Microservices with Go', 'Dive deep into Go microservices, exploring gRPC, message brokers (Kafka), and event-driven architectural patterns used in modern scalable enterprises.', '{"name":"Sarah Chen","title":"SENIOR GO ENGINEER","avatar":"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"}', '$1,299.00', 1299, NULL, NULL, 'System Design', 'Intermediate', 4.9, 1024, '1,024 ratings', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1470', '[{"id":"01","title":"Introduction to gRPC","lessons":[{"title":"Protobuf Basics","duration":"14:10","type":"video"}]}]', 'BOOTCAMP STRATEGY', NULL, NULL, 100, '2024-01-10', '[]', '[]'
) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'kubernetes-zero-trust', 'Hardening Kubernetes: The Zero-Trust Framework', 'Implement zero-trust security architecture across Kubernetes clusters. Understand RBAC, network policies, identity-aware proxies, and runtime security.', '{"name":"Marcus Thorne","title":"CISO","avatar":"https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&q=80"}', '$849.00', 849, NULL, NULL, 'Security Architecture', 'Intermediate', 4.7, 846, '846 ratings', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1470', '[]', 'CYBERSECURITY TRACK', NULL, NULL, 85, '2023-11-20', '[]', '[]'
) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'observability-engineering', 'Observability Engineering: Tracing the Void', 'Learn OpenTelemetry from the ground up to add trace analytics to monolithic and microservice systems, accelerating MTTR in incident response.', '{"name":"Adrian Kos","title":"SRE MANAGER","avatar":"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80"}', '$720.00', 720, NULL, NULL, 'Distributed Systems', 'Advanced', 4.6, 620, '620 ratings', 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1488', '[]', 'SRE TRACK', NULL, NULL, 75, '2023-09-15', '[]', '[]'
) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.courses (
    id, title, description, instructor, price, "numericPrice", "originalPrice", discount, category, level, rating, "reviewsCount", "reviewsCountLabel", image, curriculum, track, enrolled, "lastUpdated", popularity, date, reviews, includes
) VALUES (
    'aws-cloud-native', 'AWS Cloud Native Architectures', 'Your starting point for learning Amazon Web Services. Hands-on labs with ECS, Lambda, DynamoDB, API Gateway, and CloudFormation.', '{"name":"John D.","avatar":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"}', '$199.00', 199, NULL, NULL, 'Cloud Infrastructure', 'Beginner', 4.4, 450, '450 ratings', 'https://images.unsplash.com/photo-1667375085698-fa3ebaf0a049?auto=format&fit=crop&q=80&w=1470', '[]', 'FOUNDATION', NULL, NULL, 60, '2023-05-15', '[]', '[]'
) ON CONFLICT (id) DO NOTHING;