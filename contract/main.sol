// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CourseCompletionBadge {
    uint256 private _tokenIdCounter;

    enum BadgeType { Merit, Completion }

    struct Course {
        string name;
        string description;
        BadgeType badgeType;
    }

    mapping(uint256 => Course) private _courses;
    mapping(address => bool) private _instructors;
    mapping(uint256 => address) private _tokenOwners;
    mapping(address => uint256[]) private _ownedTokens;

    address public admin;

    event InstructorValidated(address indexed instructor);
    event InstructorRevoked(address indexed instructor);
    event BadgeMinted(address indexed recipient, uint256 indexed tokenId, string courseName, BadgeType badgeType);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyInstructor() {
        require(_instructors[msg.sender], "Only validated instructors can mint badges");
        _;
    }

    function validateInstructor(address instructor) external onlyAdmin {
        _instructors[instructor] = true;
        emit InstructorValidated(instructor);
    }

    function revokeInstructor(address instructor) external onlyAdmin {
        _instructors[instructor] = false;
        emit InstructorRevoked(instructor);
    }

    function mintBadge(address recipient, string memory courseName, string memory courseDescription, BadgeType badgeType) external onlyInstructor {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;

        _courses[newTokenId] = Course(courseName, courseDescription, badgeType);
        _tokenOwners[newTokenId] = recipient;
        _ownedTokens[recipient].push(newTokenId);

        emit BadgeMinted(recipient, newTokenId, courseName, badgeType);
    }   

    function getCourseDetails(uint256 tokenId) external view returns (string memory name, string memory description, BadgeType badgeType) {
        require(_tokenOwners[tokenId] != address(0), "Token ID does not exist");
        Course memory course = _courses[tokenId];
        return (course.name, course.description, course.badgeType);
    }

    function getOwnedTokens(address owner) external view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }
}
