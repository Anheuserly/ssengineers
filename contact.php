<?php
$pageTitle = "Contact Us - SS Engineers";
$pageDescription = "Get in touch with SS Engineers for all your fire fighting needs. We provide 24/7 emergency services.";
include 'includes/header.php';
?>

<div class="container py-5">
    <h1 class="mb-4">Contact Us</h1>
    
    <div class="row">
        <div class="col-md-6">
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Send Us a Message</h5>
                    <form id="contactForm" action="process-contact.php" method="post">
                        <div class="mb-3">
                            <label for="name" class="form-label">Your Name</label>
                            <input type="text" class="form-control" id="name" name="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone Number</label>
                            <input type="tel" class="form-control" id="phone" name="phone">
                        </div>
                        <div class="mb-3">
                            <label for="service" class="form-label">Service Interested In</label>
                            <select class="form-select" id="service" name="service">
                                <option value="">Select a service</option>
                                <option value="Fire Extinguishers">Fire Extinguishers</option>
                                <option value="Fire Alarm Systems">Fire Alarm Systems</option>
                                <option value="Sprinkler Systems">Sprinkler Systems</option>
                                <option value="Fire Safety Training">Fire Safety Training</option>
                                <option value="Fire Risk Assessment">Fire Risk Assessment</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Your Message</label>
                            <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-danger">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Contact Information</h5>
                    <p><strong>Address:</strong><br>
                    SS Engineers<br>
                    H.No,. 535 S/F, Left Side<br>
                    Kh-60,128-D21, Chattarpur Hills<br>
                    New Delhi, 110074</p>
                    
                    <p><strong>Phone:</strong><br>
                    Office: +91 9871936837<br>
                    Emergency: +91 9315898869 (24/7)</p>
                    
                    <p><strong>Email:</strong><br>
                    General Inquiries: anil@ssengineers.in<br>
                    Support: saleem@ssengineers.in</p>
                    
                    <h5 class="mt-4">Business Hours</h5>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br>
                    Saturday: 9:00 AM - 1:00 PM<br>
                    Sunday: Closed</p>
                    
                    <p class="text-danger"><strong>24/7 Emergency Service Available</strong></p>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Our Location</h5>
                    <div class="ratio ratio-16x9">
                        <!-- Replace with your actual Google Maps embed code -->
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.0!3d19.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM2LjAiTiA3MsKwMDInMjQuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>