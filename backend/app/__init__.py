from flask import Flask
from flask_cors import CORS

def create_app():
    """
    Factory function to create and configure the Flask application.
    """
    app = Flask(__name__)

    # Load configuration from the instance folder
    app.config.from_object("instance.config.Config")

    # Enable CORS for cross-origin communication with the frontend
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # Use Vite's default dev server URL

    # Register blueprints
    from .routes import main
    app.register_blueprint(main)

    # Return the Flask app instance
    return app
