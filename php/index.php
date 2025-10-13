<?php
$pageTitle = "SS Engineers - Fire Fighting Solutions";
$pageDescription = "SS Engineers provides comprehensive fire fighting solutions including installation, maintenance and training services.";
include 'includes/header.php';
?>

<div class="jumbotron bg-light p-5 rounded">
    <h1 class="display-4">Welcome to SS Engineers</h1>
    <p class="lead">Your trusted partner for complete fire fighting solutions</p>
    <hr class="my-4">
    <p>We provide comprehensive fire safety services including installation, maintenance, and training.</p>
    <a class="btn btn-danger btn-lg" href="contact.php" role="button">Contact Us</a>
</div>

<div class="row mt-5">
    <div class="col-md-4">
        <div class="card mb-4">
            <img src="assets/images/fire-extinguisher.jpg" class="card-img-top" alt="Fire Extinguishers">
            <div class="card-body">
                <h5 class="card-title">Fire Extinguishers</h5>
                <p class="card-text">Supply, installation and maintenance of all types of fire extinguishers.</p>
                <a href="services/fire-extinguishers.php" class="btn btn-outline-danger">Learn More</a>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card mb-4">
            <img src="assets/images/fire-alarm.jpg" class="card-img-top" alt="Fire Alarm Systems">
            <div class="card-body">
                <h5 class="card-title">Fire Alarm Systems</h5>
                <p class="card-text">Design, installation and maintenance of fire detection and alarm systems.</p>
                <a href="services/fire-alarms.php" class="btn btn-outline-danger">Learn More</a>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card mb-4">
            <img src="assets/images/training.jpg" class="card-img-top" alt="Fire Safety Training">
            <div class="card-body">
                <h5 class="card-title">Fire Safety Training</h5>
                <p class="card-text">Comprehensive training programs for your staff on fire safety procedures.</p>
                <a href="services/fire-safety-training.php" class="btn btn-outline-danger">Learn More</a>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
