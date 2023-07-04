DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS votingSubmissions CASCADE;


CREATE TABLE users(
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    pass_word VARCHAR(100) NOT NULL,
    user_address VARCHAR(200),
    isAdmin BOOLEAN DEFAULT false
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES users("user_id")
);

CREATE TABLE voting_submissions (
    submission_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR (100) NOT NULL,
    category VARCHAR (30) NOT NULL,
    proposal VARCHAR(1000) NOT NULL,
    photo VARCHAR(200),
    date_time_entry TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    votes INT DEFAULT 0,
    submission_status VARCHAR(50) DEFAULT 'pending'
);


INSERT INTO users (username, pass_word, user_address, isAdmin)
VALUES
    ('JohnDoe', 'password1', '123 Main St', false),
    ('JaneSmith', 'password2', '456 Oak Ave', false),
    ('DavidJohnson', 'password3', '789 Elm St', false),
    ('SarahWilliams', 'password4', '321 Pine Rd', false),
    ('MichaelBrown', 'password5', '654 Maple Ln', false),
    ('JenniferDavis', 'password6', '987 Birch Dr', false),
    ('ChristopherMiller', 'password7', '555 Cedar Ave', false),
    ('JessicaWilson', 'password8', '777 Spruce Blvd', false),
    ('MatthewTaylor', 'password9', '222 Walnut Ct', false);

INSERT INTO votingSubmissions (title, category, submission, photo, user_id, votes, submission_status)
VALUES
    ('Renovate Public Toilets on Main Street', 'Services', 'Renovate the public toilets located on Main Street to provide a cleaner and more comfortable facility for residents and visitors.', 'https://example.com/photo21.jpg', 4, 10, 'approved'),
    ('Repair Pot Holes on Elm Avenue', 'Transportation', 'Repair the pot holes on Elm Avenue to improve road safety and ensure a smoother driving experience for motorists.', 'https://example.com/photo22.jpg', 2, 15, 'complete'),
    ('Expand Mental Health Counseling Services at Local School', 'Services', 'Expand the availability of mental health counseling services at the local school to provide support and assistance to students in need.', 'https://example.com/photo23.jpg', 3, 0, 'pending'),
    ('Install Fitness Stations in City Park', 'Sport and Leisure', 'Install outdoor fitness stations with exercise equipment in City Park to encourage physical activity and fitness among park visitors.', 'https://example.com/photo24.jpg', 5, 8, 'approved'),
    ('Improve Bike Lanes on Oak Street', 'Transportation', 'Improve the bike lanes on Oak Street by adding protective barriers and clear signage to enhance safety for cyclists.', 'https://example.com/photo25.jpg', 7, 12, 'complete'),
    ('Increase Funding for Homeless Shelters', 'Services', 'Allocate additional funding to local homeless shelters to provide better resources, support, and assistance to individuals experiencing homelessness.', 'https://example.com/photo26.jpg', 9, 0, 'pending'),
    ('Renovate Playgrounds in Neighborhood Parks', 'Sport and Leisure', 'Renovate the playgrounds in neighborhood parks to update the equipment, improve safety features, and create a more engaging play environment for children.', 'https://example.com/photo27.jpg', 1, 18, 'approved'),
    ('Upgrade Street Signs and Signage', 'Transportation', 'Upgrade street signs and signage throughout the city to enhance visibility, improve wayfinding, and ensure accurate information for residents and visitors.', 'https://example.com/photo28.jpg', 8, 7, 'complete'),
    ('Expand After-School Programs for Youth', 'Services', 'Expand after-school programs for youth to provide educational, recreational, and mentoring opportunities for children and adolescents in the community.', 'https://example.com/photo29.jpg', 6, 0, 'pending'),
    ('Create Dog-Friendly Parks', 'Sport and Leisure', 'Designate certain parks as dog-friendly areas where pet owners can bring their dogs for exercise and socialization, ensuring a safe and enjoyable environment for all.', 'https://example.com/photo30.jpg', 9, 14, 'approved'),
    ('Renovate Smith Park Playground', 'Sport and Leisure', 'Renovate the playground at Smith Park by installing new play structures, safer surfacing, and adding shaded areas for families to enjoy.', 'https://example.com/photo41.jpg', 4, 18, 'approved'),
    ('Repair Potholes on Oak Street between 5th and 10th Avenue', 'Transportation', 'Repair the numerous potholes on Oak Street between 5th and 10th Avenue to ensure smoother and safer driving conditions.', 'https://example.com/photo42.jpg', 2, 11, 'complete'),
    ('Expand Mental Health Counseling Services at Local Schools', 'Services', 'Expand mental health counseling services at all local schools to provide support and resources for students dealing with emotional and psychological challenges.', 'https://example.com/photo43.jpg', 3, 0, 'pending'),
    ('Construct Outdoor Fitness Zone in City Park', 'Sport and Leisure', 'Construct a dedicated outdoor fitness zone in City Park with various exercise equipment to promote physical fitness and an active lifestyle.', 'https://example.com/photo44.jpg', 5, 9, 'approved'),
    ('Improve Bike Lane Connectivity across the City', 'Transportation', 'Enhance bike lane connectivity by adding more dedicated bike lanes and connecting existing ones to create a safer and more convenient cycling network throughout the city.', 'https://example.com/photo45.jpg', 7, 14, 'complete'),
    ('Establish Community Mental Health Support Center', 'Services', 'Establish a community mental health support center to provide counseling, therapy, and resources for individuals and families facing mental health challenges.', 'https://example.com/photo46.jpg', 9, 0, 'pending'),
    ('Revamp Central Park Tennis Courts', 'Sport and Leisure', 'Revamp the tennis courts in Central Park by resurfacing them, adding new nets, and providing seating areas for players and spectators.', 'https://example.com/photo47.jpg', 1, 16, 'approved'),
    ('Upgrade Pedestrian Crosswalks with High-Visibility Markings', 'Transportation', 'Upgrade pedestrian crosswalks across the city with high-visibility markings, pedestrian-activated signals, and additional safety measures to improve pedestrian safety.', 'https://example.com/photo48.jpg', 8, 10, 'complete'),
    ('Expand After-School Art Programs for Children', 'Services', 'Expand after-school art programs for children by offering diverse art classes, workshops, and opportunities for creative expression.', 'https://example.com/photo49.jpg', 6, 0, 'pending'),
    ('Create Dedicated Dog Park in West End Neighborhood', 'Sport and Leisure', 'Create a dedicated dog park in the West End neighborhood with fenced play areas, agility equipment, and waste disposal stations to provide a safe and enjoyable space for dogs and their owners.', 'https://example.com/photo50.jpg', 2, 15, 'approved');
