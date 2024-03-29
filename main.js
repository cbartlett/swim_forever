// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that will contain the game
var main_state = {

    // Function called first to load all the assets
    preload: function() {
        // Change the background color of the game
        this.game.stage.backgroundColor = '#6cc6ea';

        // Load the bird sprite
        this.game.load.image('bird', 'assets/bird.png');
    },

    // Fuction called after 'preload' to setup the game
    create: function() {
        // Display the bird on the screen
        this.bird = this.game.add.sprite(180, 245, 'bird');

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // Call the 'jump' function when the spacekey is hit
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this);

        // And on mouse click
        game.input.onDown.add(this.jump, this);

        // Timer that calls 'add_row_of_pipes' ever 1.5 seconds
        this.timer = this.game.time.events.loop(1000, this.update_score, this);

        // Add a score label on the top left of the screen
        this.score = 0;
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "Time: 0", style);

        introText = game.add.text(game.world.centerX, 400, '- tap to swim -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        introText.anchor.setTo(0.5, 0.5);

        game.input.onDown.add(releaseBall, this);

    },

    // This function is called 60 times per second
    update: function() {
        // If the bird is out of the world (too high or too low), call the 'restart_game' function
        if (this.bird.inWorld == false)
            this.restart_game();
    },

    // Make the bird jump
    jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

    // Restart the game
    restart_game: function() {
        // Remove the timer
        this.game.time.events.remove(this.timer);

        // Start the 'main' state, which restarts the game
        this.game.state.start('main');
    },

    update_score: function() {
        this.score += 1;
        this.label_score.content = "Time: " +this.score;
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);
game.state.start('main');
