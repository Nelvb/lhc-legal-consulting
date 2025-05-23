# src/backend/tests/test_image_service.py

import pytest
from unittest.mock import patch, MagicMock
from app.services.image_service import ImageService

@patch("app.services.image_service.cloudinary.uploader.upload")
def test_upload_image_success(mock_upload):
    mock_upload.return_value = {
        'secure_url': 'https://image.url/img.jpg',
        'public_id': 'abc123',
        'width': 1200,
        'height': 800,
        'format': 'jpg'
    }
    fake_file = MagicMock()
    result = ImageService.upload_image(fake_file)
    assert result['url'] == 'https://image.url/img.jpg'
    assert result['public_id'] == 'abc123'

def test_upload_image_no_file():
    with pytest.raises(ValueError):
        ImageService.upload_image(None)

@patch("app.services.image_service.cloudinary.uploader.destroy")
def test_delete_image_success(mock_destroy):
    mock_destroy.return_value = {'result': 'ok'}
    assert ImageService.delete_image('some_id') is True

@patch("app.services.image_service.cloudinary.uploader.destroy")
def test_delete_image_fail(mock_destroy):
    mock_destroy.return_value = {'result': 'not_found'}
    assert ImageService.delete_image('some_id') is False

def test_delete_image_no_id():
    assert ImageService.delete_image(None) is False
