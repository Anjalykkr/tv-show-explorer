import { Component, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

interface Review {
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-review-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.html',
  styleUrls: ['./review-form.scss']
})
export class ReviewForm {
  @Input() showId!: number;
  private fb = new FormBuilder();

  reviews = signal<Review[]>([]);

  reviewForm = this.fb.group({
    rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required, Validators.minLength(4)]]
  });

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    const raw = localStorage.getItem('tvReviews');
    if (raw) {
      const allReviews = JSON.parse(raw) as Record<number, Review[]>;
      this.reviews.set(allReviews[this.showId] || []);
    }
  }

  persistReviews() {
    const raw = localStorage.getItem('tvReviews');
    const allReviews = raw ? JSON.parse(raw) as Record<number, Review[]> : {};
    allReviews[this.showId] = this.reviews();
    localStorage.setItem('tvReviews', JSON.stringify(allReviews));
  }

  submitReview() {
  if (this.reviewForm.valid) {
    const raw = this.reviewForm.value;

    // Runtime guard + type assertion
    if (typeof raw.rating === 'number' && typeof raw.comment === 'string') {
      const review = { rating: raw.rating, comment: raw.comment } as const;
      this.reviews.update(current => [...current, review]);
      this.persistReviews();
      this.reviewForm.reset();
    }
  }
}

  deleteReview(index: number) {
    this.reviews.update(current => current.filter((_, i) => i !== index));
    this.persistReviews();
  }
}
